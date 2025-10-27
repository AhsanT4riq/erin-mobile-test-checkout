import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { Control } from 'react-hook-form';
import { PaymentFormData } from '../../schema/paymentSchema';
import FormControlTextInput from '../form/FormControlTextInput';
import FormControlCheckBox from '../form/FormControlCheckBox';

interface BillingAddressFormProps {
  control: Control<PaymentFormData>;
  billingAddressSameAsShipping: boolean;
}

const BillingAddressForm: FC<BillingAddressFormProps> = ({
  control,
  billingAddressSameAsShipping,
}) => {
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
        placeholder="123 Main Street"
        hidden={billingAddressSameAsShipping}
      />

      <View style={styles.row}>
        <FormControlTextInput
          control={control}
          name="billingCity"
          label="City"
          mode="outlined"
          style={[styles.halfInput]}
          hidden={billingAddressSameAsShipping}
        />
        <FormControlTextInput
          control={control}
          name="billingZipPostalCode"
          label="ZIP Code"
          mode="outlined"
          style={[styles.halfInput]}
          hidden={billingAddressSameAsShipping}
        />
      </View>
    </FormCard>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
});

export default BillingAddressForm;
