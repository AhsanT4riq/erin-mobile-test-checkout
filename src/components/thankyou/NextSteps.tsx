import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

const NextSteps: FC = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          What's Next?
        </Text>
        <Divider style={styles.divider} />

        <View style={styles.stepContainer}>
          <Text variant="bodyMedium" style={styles.stepNumber}>
            1.
          </Text>
          <Text variant="bodyMedium" style={styles.stepText}>
            You'll receive a confirmation email shortly
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text variant="bodyMedium" style={styles.stepNumber}>
            2.
          </Text>
          <Text variant="bodyMedium" style={styles.stepText}>
            We'll send you tracking information when your order ships
          </Text>
        </View>

        <View style={styles.stepContainer}>
          <Text variant="bodyMedium" style={styles.stepNumber}>
            3.
          </Text>
          <Text variant="bodyMedium" style={styles.stepText}>
            Track your order status in your account
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  stepNumber: {
    marginRight: 12,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  stepText: {
    flex: 1,
    color: '#666',
  },
});

export default NextSteps;
