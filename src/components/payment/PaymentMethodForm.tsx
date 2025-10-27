import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { TextInput } from 'react-native-paper';

interface PaymentMethodFormProps {}

const PaymentMethodForm: FC<PaymentMethodFormProps> = () => {
  return (
    <FormCard
      title="Payment Method"
      description="All transactions are secure and encrypted."
    >
      {/* Card Number */}
      <TextInput
        label="Card Number"
        mode="outlined"
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
      />

      {/* Cardholder Name */}
      <TextInput
        label="Cardholder Name"
        mode="outlined"
        style={styles.input}
        placeholder="John Doe"
      />

      {/* Expiry and CVV in a row */}
      <View style={styles.row}>
        <TextInput
          label="Expiry Date"
          mode="outlined"
          style={[styles.input, styles.halfInput]}
          placeholder="MM/YY"
          keyboardType="number-pad"
        />
        <TextInput
          label="CVV"
          mode="outlined"
          style={[styles.input, styles.halfInput]}
          placeholder="123"
          keyboardType="number-pad"
          secureTextEntry
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
