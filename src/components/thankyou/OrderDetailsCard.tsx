import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

import { OrderDetails } from '../../types/order';
import { formatDate } from '../../utils/date';

interface OrderDetailsCardProps {
  orderDetails: OrderDetails;
}

const OrderDetailsCard: FC<OrderDetailsCardProps> = ({ orderDetails }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Order Details
        </Text>
        <Divider style={styles.divider} />

        <View style={styles.detailRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Order Number:
          </Text>
          <Text variant="bodyMedium" style={styles.value}>
            #{orderDetails.orderNumber}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Order Date:
          </Text>
          <Text variant="bodyMedium" style={styles.value}>
            {formatDate(orderDetails.orderDate)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Total Amount:
          </Text>
          <Text variant="bodyLarge" style={[styles.value, styles.amount]}>
            ${orderDetails.orderTotal.toFixed(2)}
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '600',
  },
  amount: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetailsCard;
