import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import FormHeading from '../form/FormHeading';
import { OrderSummary as OrderSummaryType } from '../../types/order';

interface OrderSummaryProps {
  summary: OrderSummaryType;
}

const OrderSummary: FC<OrderSummaryProps> = ({ summary }) => {
  const { itemCount, itemsTotal, shipping, tax, total } = summary;
  return (
    <Card style={styles.card}>
      <Card.Content>
        <FormHeading title="Order Summary" />
        <Divider style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </Text>
          <Text variant="bodyMedium">${itemsTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">Shipping</Text>
          <Text variant="bodyMedium">${shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium">Tax</Text>
          <Text variant="bodyMedium">${tax.toFixed(2)}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text variant="titleLarge" style={styles.totalText}>
            Total
          </Text>
          <Text variant="titleLarge" style={styles.totalText}>
            ${total.toFixed(2)}
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
