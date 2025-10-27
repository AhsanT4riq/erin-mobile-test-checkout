import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { Control } from 'react-hook-form';
import { PaymentFormData } from '../../schema/paymentSchema';
import FormControlTextInput from '../form/FormControlTextInput';
import FormControlCheckBox from '../form/FormControlCheckBox';

interface BillingAddressFormProps {
  control: Control<PaymentFormData>;
}

const BillingAddressForm: FC<BillingAddressFormProps> = ({ control }) => {
  return (
    <FormCard title="Billing Address">
      <FormControlCheckBox
        control={control}
        name="billingAddressSameAsShipping"
        label="Same as delivery address"
      />
      <FormControlTextInput
        control={control}
        name="billingStreetAddress"
        label="Billing Address"
        mode="outlined"
        style={styles.input}
        placeholder="123 Main Street"
      />

      <View style={styles.row}>
        <FormControlTextInput
          control={control}
          name="billingCity"
          label="City"
          mode="outlined"
          style={[styles.input, styles.halfInput]}
          placeholder="New York"
        />
        <FormControlTextInput
          control={control}
          name="billingZipPostalCode"
          label="ZIP Code"
          mode="outlined"
          style={[styles.input, styles.halfInput]}
          placeholder="10001"
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

export default BillingAddressForm;
