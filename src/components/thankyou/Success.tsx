import React, { FC, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const SuccessMessage: FC = () => {
  return (
    <Fragment>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>✓</Text>
      </View>
      {/* Thank You Message */}
      <Text variant="headlineMedium" style={styles.title}>
        Thank You!
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Your order has been placed successfully
      </Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  iconText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
});

export default SuccessMessage;
