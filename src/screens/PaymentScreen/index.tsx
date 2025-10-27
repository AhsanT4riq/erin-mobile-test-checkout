import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import CheckoutProgressModal from '../../components/modal/Checkout/CheckoutProgressModal';
import BillingAddressForm from '../../components/payment/BillingAddressForm';
import OrderSummary from '../../components/payment/OrderSummary';
import PaymentMethodForm from '../../components/payment/PaymentMethodForm';
import SecurityNotice from '../../components/payment/SecurityNotice';
import HeadlineSmall from '../../components/shared/Headline';
import BottomButtons from '../../containers/BottomButton';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import { useCreateAddress, useCreateUser, useProcessPayment } from '../../graphql/hooks';
import { usePaymentForm } from '../../hooks/usePaymentForm';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { PaymentFormData } from '../../schema/paymentSchema';
import { useStores } from '../../store/rootStore';
import { OrderSummary as OrderSummaryType } from '../../types/order';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

interface PaymentScreenProps {
  navigation: PaymentScreenNavigationProp;
}

interface CheckoutStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

const PaymentScreen: React.FC<PaymentScreenProps> = observer(({ navigation }) => {
  const { cart, user, address, payment, order } = useStores();
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
  const [steps, setSteps] = useState<CheckoutStep[]>([
    { id: 'user', label: 'Creating account', status: 'pending' },
    { id: 'address', label: 'Saving delivery address', status: 'pending' },
    { id: 'payment', label: 'Processing payment', status: 'pending' },
  ]);

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

  const updateStepStatus = (stepId: string, status: CheckoutStep['status'], error?: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === stepId ? { ...step, status, error } : step)),
    );
  };

  const resetSteps = () => {
    setSteps([
      { id: 'user', label: 'Creating account', status: 'pending' },
      {
        id: 'address',
        label: 'Saving delivery address',
        status: 'pending',
      },
      { id: 'payment', label: 'Processing payment', status: 'pending' },
    ]);
  };

  const executePayment = async (data: PaymentFormData) => {
    // Save to local store
    payment.setPaymentData(data);

    // Validate cart exists
    if (!cart.cartId) {
      updateStepStatus('user', 'error', 'Cart information is missing');
      return;
    }

    try {
      // Chain Api Calls
      // Step 1: Create User
      let userId = user.userId;
      if (!userId) {
        updateStepStatus('user', 'processing');
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
          updateStepStatus('user', 'error', 'Failed to create user');
          return;
        }

        // Step 1 Complete: Save user Id to local store
        user.setUserId(userId);
      }
      updateStepStatus('user', 'completed');

      // Step 2: Create Address
      let addressId = address.addressId;
      if (!addressId) {
        updateStepStatus('address', 'processing');
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
          updateStepStatus('address', 'error', 'Failed to save delivery address');
          return;
        }

        // Step 2 Complete: Save address Id to local store
        address.setAddressId(addressId);
      }
      updateStepStatus('address', 'completed');

      // Use shipping address as billing address
      let billingAddressId = data.billingAddressSameAsShipping ? addressId : null;

      // Create new billing address
      if (!billingAddressId) {
        updateStepStatus('address', 'processing');
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
        billingAddressId = billingAddressResult.data?.createAddress.id || null;

        if (!billingAddressId) {
          updateStepStatus('address', 'error', 'Failed to save billing address');
          return;
        }
      }

      // Step 3: Process Payment
      updateStepStatus('payment', 'processing');
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
        updateStepStatus('payment', 'completed');

        // Save order to OrderStore
        if (result.order) {
          order.setOrder(result.order);
        }

        // Clear local store
        cart.clearCart();
        user.clear();
        address.clear();
        payment.clear();

        // Navigate to thank you screen
        setTimeout(() => {
          setIsProcessing(false);
          navigation.navigate('ThankYou');
        }, 500);
      } else {
        // Payment Failed
        const errorMessage = result?.message || 'Failed to process payment';
        updateStepStatus('payment', 'error', errorMessage);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);

      // Determine which step failed and provide appropriate message
      const currentStep = steps.find((s) => s.status === 'processing');
      if (currentStep) {
        updateStepStatus(currentStep.id, 'error', error?.message || 'An error occurred');
      }
    }
  };

  const orderSummary: OrderSummaryType = {
    itemCount: cart.itemCount,
    itemsTotal: cart.subtotal,
    shipping: address.shippingCost,
    tax: cart.tax,
    total: cart.getTotal(address.shippingCost),
  };

  const handlePlaceOrder = handleSubmit(async (data) => {
    payment.setPaymentData(data);
    resetSteps();
    setIsProcessing(true);
    await executePayment(data);
  });

  const handleRetry = async () => {
    resetSteps();
    const data = payment.toFormData();
    await executePayment(data);
  };

  const handleCloseModal = () => {
    setIsProcessing(false);
    resetSteps();
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
          disabled={!isValid || isProcessing}
          style={[styles.button]}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </BottomButtons>
      <CheckoutProgressModal
        visible={isProcessing}
        steps={steps}
        onRetry={handleRetry}
        onClose={handleCloseModal}
      />
    </Container>
  );
});

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
