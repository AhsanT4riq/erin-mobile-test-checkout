import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

import { StepStatus } from '../../../types/checkout';

interface StepIconProps {
  status: StepStatus;
}

const StepIcon: FC<StepIconProps> = ({ status }) => {
  return (
    <View style={styles.iconContainer}>
      {status === 'completed' && (
        <View style={styles.checkIcon}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
      {status === 'processing' && (
        <ActivityIndicator size="small" color="#6200ee" />
      )}
      {status === 'error' && (
        <View style={styles.errorIcon}>
          <Text style={styles.errorText}>✕</Text>
        </View>
      )}
      {status === 'pending' && <View style={styles.pendingIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#952821ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pendingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
});

export default StepIcon;
