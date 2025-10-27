import React, { FC, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { Control } from 'react-hook-form';
import { AddressFormData } from '../../schema/addressSchema';
import FormControlTextInput from '../form/FormControlTextInput';

interface DeliveryAddressFormProps {
  control: Control<AddressFormData>;
}

const DeliveryAddressForm: FC<DeliveryAddressFormProps> = ({ control }) => {
  return (
    <Fragment>
      <FormCard description="Where should we deliver your order?">
        {/* Address Line 1 */}
        <FormControlTextInput
          name="streetAddress"
          control={control}
          label="Street Address"
          mode="outlined"
          placeholder=""
        />

        {/* Address Line 2 */}
        <FormControlTextInput
          name="apartmentSuite"
          control={control}
          label="Apartment, Suite, etc. (Optional)"
          mode="outlined"
          placeholder=""
        />

        {/* City */}
        <FormControlTextInput
          name="city"
          control={control}
          mode="outlined"
          placeholder=""
          label="City"
        />

        {/* State/Province and ZIP in a row */}
        <View style={styles.row}>
          <FormControlTextInput
            name="stateProvince"
            control={control}
            label="State"
            mode="outlined"
            style={[styles.halfInput]}
          />
          <FormControlTextInput
            name="zipPostalCode"
            control={control}
            label="Postal Code"
            mode="outlined"
            style={[styles.halfInput]}
            placeholder=""
          />
        </View>

        {/* Country */}
        <FormControlTextInput
          name="country"
          control={control}
          label="Country"
          mode="outlined"
          placeholder=""
        />
      </FormCard>

      <FormCard title="Delivery Instructions">
        <FormControlTextInput
          name="deliveryInstructions"
          control={control}
          label="Special Delivery Instructions (Optional)"
          mode="outlined"
          placeholder=""
          multiline
          numberOfLines={3}
          style={styles.textBox}
        />
      </FormCard>
    </Fragment>
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
  textBox: {
    maxHeight: 100,
    minHeight: 60,
  },
});

export default DeliveryAddressForm;
