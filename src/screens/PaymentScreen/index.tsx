import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import HeadlineSmall from '../../components/shared/Headline';
import OrderSummary from '../../components/payment/OrderSummary';
import PaymentMethodForm from '../../components/payment/PaymentMethodForm';
import BillingAddressForm from '../../components/payment/BillingAddressForm';
import SecurityNotice from '../../components/payment/SecurityNotice';
import BottomButtons from '../../containers/BottomButton';
import { observer } from 'mobx-react-lite';
import { usePaymentForm } from '../../hooks/usePaymentForm';
import { useStores } from '../../store/rootStore';
import { OrderSummary as OrderSummaryType } from '../../types/order';
import {
  useCreateAddress,
  useCreateUser,
  useProcessPayment,
} from '../../graphql/hooks';

type PaymentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Payment'
>;

interface PaymentScreenProps {
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = observer(
  ({ navigation }) => {
    const { cart, user, address, payment } = useStores();
    const {
      control,
      watch,
      handleSubmit,
      reset,
      trigger,
      formState: { isValid },
    } = usePaymentForm();
    const billingAddressSameAsShipping = watch('billingAddressSameAsShipping');

    const [createUser] = useCreateUser();
    const [createAddress] = useCreateAddress();
    const [processPayment] = useProcessPayment();
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');

    useEffect(() => {
      if (payment.isComplete) {
        reset(payment.toFormData(), {
          keepDirty: false,
          keepTouched: false,
          keepErrors: false,
          keepIsSubmitted: false,
        });
        trigger();
      }
    }, [payment.isComplete, reset, payment, trigger]);

    const handlePlaceOrder = handleSubmit(async data => {
      // Save to local store
      payment.setPaymentData(data);

      // Validate cart exists
      if (!cart.cartId) {
        Alert.alert('Error', 'Cart information is missing. Please start over.');
        return;
      }

      setIsProcessing(true);

      try {
        // Chain Api Calls

        // Step 1: Create User
        let userId = user.userId;
        if (!userId) {
          setProcessingStep('Creating User...');
          const userResult = await createUser({
            variables: {
              input: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                company: user.company,
                specialInstructions: user.specialInstructions,
              },
            },
          });
          userId = userResult.data?.createUser.id || null;

          if (!userId) {
            throw new Error('Failed to create user');
          }

          // Step 1 Complete: Save user Id to local store
          user.setUserId(userId);
        }

        // Step 2: Create Address
        let addressId = address.addressId;
        if (!addressId) {
          setProcessingStep('Creating Address...');
          const addressResult = await createAddress({
            variables: {
              input: {
                userId,
                streetAddress: address.streetAddress,
                city: address.city,
                stateProvince: address.stateProvince,
                zipPostalCode: address.zipPostalCode,
                country: address.country,
                deliveryInstructions: address.deliveryInstructions,
                isDefault: true,
              },
            },
          });
          addressId = addressResult.data?.createAddress.id || null;

          if (!addressId) {
            throw new Error('Failed to save delivery address');
          }

          // Step 2 Complete: Save address Id to local store
          address.setAddressId(addressId);
        }

        // Use shipping address as billing address
        let billingAddressId = data.billingAddressSameAsShipping
          ? addressId
          : null;

        // Create new billing address
        if (!billingAddressId) {
          setProcessingStep('Creating Billing Address...');
          const billingAddressResult = await createAddress({
            variables: {
              input: {
                userId,
                streetAddress: data.billingStreetAddress || '',
                city: address.city,
                stateProvince: address.stateProvince,
                zipPostalCode: data.billingZipPostalCode || '',
                country: address.country,
                deliveryInstructions: address.deliveryInstructions,
                isDefault: false,
              },
            },
          });
          billingAddressId =
            billingAddressResult.data?.createAddress.id || null;

          if (!billingAddressId) {
            throw new Error('Failed to save billing address');
          }
        }

        // Step 3: Process Payment
        setProcessingStep('Processing Payment...');
        const paymentResult = await processPayment({
          variables: {
            input: {
              userId,
              cartId: cart.cartId,
              shippingAddressId: addressId,
              billingAddressId,
              cardNumber: data.cardNumber,
              cardholderName: data.cardholderName,
              expiryMonth: data.expiryMonth,
              expiryYear: data.expiryYear,
              cvv: data.cvv,
              deliveryMethod: address.deliveryMethod,
            },
          },
        });

        const result = paymentResult.data?.processPayment;

        if (result?.success) {
          // Payment successful
          setProcessingStep('Order placed successfully!');

          // Clear local cart
          cart.clearCart();

          // Navigate to thank you screen
          setTimeout(() => {
            navigation.navigate('ThankYou');
          }, 500);
        } else {
          // Payment Failed
          const errorMessage = result?.message || 'Failed to process payment';
          Alert.alert('Payment Failed', errorMessage, [
            {
              text: 'Try Again',
              onPress: () => {
                // User and address are already created, just retry payment
                setIsProcessing(false);
                setProcessingStep('');
              },
            },
          ]);
        }
      } catch (error: any) {
        console.error('Checkout error:', error);

        // Determine which step failed and provide appropriate message
        let errorMessage = 'An error occurred during checkout.';
        let retryMessage = 'Please try again.';

        if (processingStep.includes('user')) {
          errorMessage = 'Failed to create user account.';
        } else if (processingStep.includes('address')) {
          errorMessage = 'Failed to save delivery address.';
        } else if (processingStep.includes('payment')) {
          errorMessage = 'Failed to process payment.';
          retryMessage =
            'Your information has been saved. Please try placing the order again.';
        }

        Alert.alert(
          'Error',
          `${errorMessage}\n\n${error?.message || retryMessage}`,
          [
            {
              text: 'OK',
              onPress: () => {
                setIsProcessing(false);
                setProcessingStep('');
              },
            },
          ],
        );
      }
    });

    const orderSummary: OrderSummaryType = {
      itemCount: cart.itemCount,
      itemsTotal: cart.subtotal,
      shipping: cart.shippingFlat,
      tax: cart.tax,
      total: cart.total,
    };

    return (
      <Container>
        <ContentContainer>
          <HeadlineSmall title="Payment Information" />

          {/* Order Summary Card */}
          <OrderSummary summary={orderSummary} />

          {/* Payment Method Card */}
          <PaymentMethodForm control={control} />

          {/* Billing Address Card */}
          <BillingAddressForm
            control={control}
            billingAddressSameAsShipping={billingAddressSameAsShipping}
          />

          {/* Security Notice */}
          <SecurityNotice />

          {isProcessing && processingStep && (
            <Text style={styles.processingText}>{processingStep}</Text>
          )}
        </ContentContainer>

        {/* Bottom Navigation Buttons */}
        <BottomButtons style={styles.bottomButtons}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.backButton]}
          >
            Back
          </Button>
          <Button
            mode="contained"
            onPress={handlePlaceOrder}
            disabled={!isValid}
            style={[styles.button]}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </BottomButtons>
      </Container>
    );
  },
);

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  backButton: {
    borderColor: '#6200ee',
  },
  processingText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
