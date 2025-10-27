import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import FormHeading from '../form/FormHeading';
import { Card } from 'react-native-paper';
import FormControlRadioGroup, {
  RadioOption,
} from '../form/FormControlRadioGroup';
import { Control } from 'react-hook-form';
import { AddressFormData } from '../../schema/addressSchema';
import { DeliveryMethod } from '../../graphql/types';

interface DeliveryOptionsProps {
  control: Control<AddressFormData>;
}

const DeliveryOptions: FC<DeliveryOptionsProps> = ({ control }) => {
  const deliveryOptions: RadioOption[] = [
    {
      label: 'Standard Shipping',
      value: DeliveryMethod.STANDARD,
      description: '5-7 business days - $10.00',
    },
    {
      label: 'Express Shipping',
      value: DeliveryMethod.EXPRESS,
      description: '2-3 business days - $25.00',
    },
    {
      label: 'Next Day Delivery',
      value: DeliveryMethod.NEXT_DAY,
      description: '1 business day - $50.00',
    },
  ];
  return (
    <Card style={styles.card}>
      <Card.Content>
        <FormHeading title="Delivery Method" />

        <FormControlRadioGroup
          name="deliveryMethod"
          control={control}
          options={deliveryOptions}
          defaultValue={DeliveryMethod.STANDARD}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
});

export default DeliveryOptions;
