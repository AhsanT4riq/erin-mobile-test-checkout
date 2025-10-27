import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import FormHeading from '../form/FormHeading';
import { Card } from 'react-native-paper';
import { DeliveryOption as DeliveryOptionType } from '../../types/delivery';
import DeliveryOption from './DeliveryOption';

interface DeliveryOptionsProps {}

const DeliveryOptions: FC<DeliveryOptionsProps> = () => {
  const deliveryOptions: DeliveryOptionType[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 10,
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 25,
    },
    {
      id: 'next-day',
      name: 'Next Day Delivery',
      description: '1 business day',
      price: 50,
    },
  ];
  return (
    <Card style={styles.card}>
      <Card.Content>
        <FormHeading title="Delivery Method" />

        {deliveryOptions.map(option => (
          <DeliveryOption key={option.id} option={option} />
        ))}
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
