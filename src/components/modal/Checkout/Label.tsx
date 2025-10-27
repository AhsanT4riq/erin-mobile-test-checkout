import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { CheckoutStep } from '../../../types/checkout';

interface StepLabelProps {
  step: CheckoutStep;
}

const StepLabel: FC<StepLabelProps> = ({ step }) => {
  return (
    <View style={styles.stepContent}>
      <Text
        variant="bodyLarge"
        style={[
          styles.stepLabel,
          step.status === 'completed' && styles.completedText,
          step.status === 'error' && styles.errorTextColor,
        ]}
      >
        {step.label}
      </Text>
      {step.status === 'error' && step.error && (
        <Text variant="bodySmall" style={styles.errorMessage}>
          {step.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 16,
  },
  completedText: {
    color: '#6200ee',
  },
  errorTextColor: {
    color: '#952821ff',
  },
  errorMessage: {
    color: '#952821ff',
    marginTop: 4,
  },
});

export default StepLabel;
