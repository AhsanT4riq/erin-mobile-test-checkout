import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text , RadioButton } from 'react-native-paper';

import { RadioOption } from '../form/FormControlRadioGroup';

interface DeliveryOptionProps {
  option: RadioOption;
  onPress: (value: string) => void;
}

const DeliveryOption: FC<DeliveryOptionProps> = ({ option, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => onPress(option.value)}
    >
      <View style={styles.deliveryOption}>
        <Text variant="bodyLarge">{option.label}</Text>
        <Text variant="bodyMedium" style={styles.deliveryDetail}>
          {option.description}
        </Text>
      </View>
      <RadioButton value={option.value} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryOption: {
    paddingVertical: 12,
  },
  deliveryDetail: {
    color: '#666',
    marginTop: 4,
  },
});

export default DeliveryOption;
