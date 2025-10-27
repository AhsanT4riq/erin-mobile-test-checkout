import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { OrderDetails } from '../../types/order';

interface DeliveryInfoCardProps {
  orderDetails: OrderDetails;
}

const DeliveryInfoCard: FC<DeliveryInfoCardProps> = ({ orderDetails }) => {
  const { deliveryAddress, estimatedDeliveryDate } = orderDetails;
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Delivery Information
        </Text>
        <Divider style={styles.divider} />

        <Text variant="bodyMedium" style={styles.addressText}>
          {deliveryAddress.street}
        </Text>
        <Text variant="bodyMedium" style={styles.addressText}>
          {deliveryAddress.city}, {deliveryAddress.state}{' '}
          {deliveryAddress.zipCode}
        </Text>
        <Text variant="bodyMedium" style={styles.addressText}>
          {deliveryAddress.country}
        </Text>

        <View style={styles.estimateContainer}>
          <Text variant="bodyMedium" style={styles.estimateLabel}>
            Estimated Delivery:
          </Text>
          <Text variant="bodyLarge" style={styles.estimateDate}>
            {estimatedDeliveryDate}
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
  addressText: {
    marginVertical: 2,
  },
  estimateContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  estimateLabel: {
    color: '#666',
    marginBottom: 4,
  },
  estimateDate: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  divider: {
    marginVertical: 12,
  },
});

export default DeliveryInfoCard;
