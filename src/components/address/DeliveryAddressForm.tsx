import React, { FC, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { TextInput } from 'react-native-paper';

interface DeliveryAddressFormProps {}

const DeliveryAddressForm: FC<DeliveryAddressFormProps> = () => {
  return (
    <Fragment>
      <FormCard description="Where should we deliver your order?">
        {/* Address Line 1 */}
        <TextInput
          label="Street Address"
          mode="outlined"
          style={styles.input}
          placeholder="123 Main Street"
        />

        {/* Address Line 2 */}
        <TextInput
          label="Apartment, Suite, etc. (Optional)"
          mode="outlined"
          style={styles.input}
          placeholder="Apt 4B"
        />

        {/* City */}
        <TextInput
          label="City"
          mode="outlined"
          style={styles.input}
          placeholder="New York"
        />

        {/* State/Province and ZIP in a row */}
        <View style={styles.row}>
          <TextInput
            label="State/Province"
            mode="outlined"
            style={[styles.input, styles.halfInput]}
            placeholder="NY"
          />
          <TextInput
            label="ZIP/Postal Code"
            mode="outlined"
            style={[styles.input, styles.halfInput]}
            placeholder="10001"
          />
        </View>

        {/* Country */}
        <TextInput
          label="Country"
          mode="outlined"
          style={styles.input}
          placeholder="United States"
        />
      </FormCard>

      <FormCard title="Delivery Instructions">
        <TextInput
          label="Special Delivery Instructions (Optional)"
          mode="outlined"
          style={styles.input}
          placeholder="Leave at front door, call on arrival, etc."
          multiline
          numberOfLines={3}
        />
      </FormCard>
    </Fragment>
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

export default DeliveryAddressForm;
