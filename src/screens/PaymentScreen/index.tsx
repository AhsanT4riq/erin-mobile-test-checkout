import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import HeadlineSmall from '../../components/shared/Headline';
import OrderSummary from '../../components/payment/OrderSummary';
import PaymentMethodForm from '../../components/payment/PaymentMethodForm';
import BillingAddressForm from '../../components/payment/BillingAddressForm';
import SecurityNotice from '../../components/payment/SecurityNotice';

type PaymentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Payment'
>;

interface PaymentScreenProps {
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const orderSummary = {
    itemCount: 3,
    itemsTotal: 149.96,
    shipping: 10,
    tax: 12,
    total: 171.96,
  };
  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Payment Information" />

        {/* Order Summary Card */}
        <OrderSummary summary={orderSummary} />

        {/* Payment Method Card */}
        <PaymentMethodForm />

        {/* Billing Address Card */}
        <BillingAddressForm />

        {/* Security Notice */}
        <SecurityNotice />
      </ContentContainer>

      {/* Bottom Navigation Buttons */}
      <View style={styles.bottomButtons}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.backButton]}
          contentStyle={styles.buttonContent}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ThankYou')}
          style={[styles.button, styles.nextButton]}
          contentStyle={styles.buttonContent}
        >
          Place Order
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
  nextButton: {},
  buttonContent: {
    paddingVertical: 8,
  },
});

export default PaymentScreen;
