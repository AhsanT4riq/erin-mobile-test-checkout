import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface SupportCardProps {
  email: string;
}

const SupportCard: FC<SupportCardProps> = ({ email }) => {
  return (
    <Card style={[styles.card, styles.supportCard]}>
      <Card.Content>
        <Text variant="bodyMedium" style={styles.supportText}>
          Need help? Contact our support team at {email}
        </Text>
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
  supportCard: {
    backgroundColor: '#e3f2fd',
  },
  supportText: {
    textAlign: 'center',
    color: '#1976d2',
  },
});

export default SupportCard;
