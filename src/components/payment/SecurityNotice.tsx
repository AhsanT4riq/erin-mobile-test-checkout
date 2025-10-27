import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface SecurityNoticeProps {}

const SecurityNotice: FC<SecurityNoticeProps> = () => {
  return (
    <Card style={[styles.card, styles.securityCard]}>
      <Card.Content>
        <Text variant="bodySmall" style={styles.securityText}>
          🔒 Your payment information is encrypted and secure. We do not store
          your card details.
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  securityCard: {
    backgroundColor: '#f0f0f0',
  },
  securityText: {
    color: '#666',
    textAlign: 'center',
  },
});

export default SecurityNotice;
