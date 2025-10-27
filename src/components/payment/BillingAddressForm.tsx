import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { TextInput } from 'react-native-paper';

interface BillingAddressFormProps {}

const BillingAddressForm: FC<BillingAddressFormProps> = () => {
  return (
    <FormCard title="Billing Address" description="Same as delivery address">
      <TextInput
        label="Billing Address"
        mode="outlined"
        style={styles.input}
        placeholder="123 Main Street"
      />

      <View style={styles.row}>
        <TextInput
          label="City"
          mode="outlined"
          style={[styles.input, styles.halfInput]}
          placeholder="New York"
        />
        <TextInput
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
