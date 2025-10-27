import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { DeliveryOption as DeliveryOptionType } from '../../types/delivery';
import { Text } from 'react-native-paper';

interface DeliveryOptionProps {
  option: DeliveryOptionType;
}

const DeliveryOption: FC<DeliveryOptionProps> = ({ option }) => {
  return (
    <View style={styles.deliveryOption}>
      <Text variant="bodyLarge">{option.name}</Text>
      <Text variant="bodyMedium" style={styles.deliveryDetail}>
        {option.description} - ${option.price.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  deliveryDetail: {
    color: '#666',
    marginTop: 4,
  },
});

export default DeliveryOption;
