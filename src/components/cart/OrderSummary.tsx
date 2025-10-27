import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { OrderSummary as OrderSummaryType } from '../../types/cart';
import { Card, Text, Divider } from 'react-native-paper';

interface OrderSummaryProps {
  summary: OrderSummaryType;
}

const OrderSummary: FC<OrderSummaryProps> = ({ summary }) => {
  return (
    <Card style={[styles.card, styles.summaryCard]}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.summaryTitle}>
          Order Summary
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Subtotal:</Text>
          <Text variant="bodyLarge">${summary.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Shipping:</Text>
          <Text variant="bodyLarge">${summary.shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Tax:</Text>
          <Text variant="bodyLarge">${summary.tax.toFixed(2)}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text variant="titleLarge" style={styles.totalText}>
            Total:
          </Text>
          <Text variant="titleLarge" style={styles.totalText}>
            ${summary.total.toFixed(2)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  summaryCard: {
    marginTop: 8,
    backgroundColor: '#fff',
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  totalText: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

export default OrderSummary;
