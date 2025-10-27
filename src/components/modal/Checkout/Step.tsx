import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { CheckoutStep } from '../../../types/checkout';

import StepIcon from './Icon';
import StepLabel from './Label';

interface StepProps {
  step: CheckoutStep;
}

const Step: FC<StepProps> = ({ step }) => {
  return (
    <View style={styles.stepRow}>
      {/* Icon */}
      <StepIcon status={step.status} />

      {/* Label and Error */}
      <StepLabel step={step} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Step;
