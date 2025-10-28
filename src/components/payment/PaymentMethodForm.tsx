import React, { FC } from 'react';
import { Control } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';

import { PaymentFormData } from '../../schema/paymentSchema';
import FormCard from '../form/FormCard';
import FormControlTextInput from '../form/FormControlTextInput';

interface PaymentMethodFormProps {
  control: Control<PaymentFormData>;
}

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({ control }) => {
  return (
    <FormCard title="Payment Method" description="All transactions are secure and encrypted.">
      {/* Card Number */}
      <FormControlTextInput
        control={control}
        name="cardNumber"
        label="Card Number"
        mode="outlined"
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
      />

      {/* Cardholder Name */}
      <FormControlTextInput
        control={control}
        name="cardholderName"
        label="Cardholder Name"
        mode="outlined"
        placeholder="John Doe"
      />

      {/* Expiry and CVV in a row */}
      <View style={styles.row}>
        <FormControlTextInput
          control={control}
          name="expiryMonth"
          label="Expiry Month"
          mode="outlined"
          style={[styles.halfInput]}
          placeholder="MM"
          keyboardType="number-pad"
        />
        <FormControlTextInput
          control={control}
          name="expiryYear"
          label="Expiry Year"
          mode="outlined"
          style={[styles.halfInput]}
          placeholder="YY"
          keyboardType="number-pad"
        />
        <FormControlTextInput
          control={control}
          name="cvv"
          label="CVV"
          mode="outlined"
          style={[styles.halfInput]}
          placeholder="123"
          keyboardType="number-pad"
        />
      </View>
    </FormCard>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
});

export default PaymentMethodForm;
