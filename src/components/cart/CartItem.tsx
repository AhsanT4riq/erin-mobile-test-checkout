import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '../../types/cart';
import { Card, Text } from 'react-native-paper';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.itemRow}>
          <View style={styles.itemDetails}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text variant="bodyMedium" style={styles.description}>
              {item.description}
            </Text>
            <Text variant="bodySmall" style={styles.price}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text variant="bodyMedium">Qty: {item.quantity}</Text>
          </View>
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetails: {
    flex: 1,
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  price: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
});

export default CartItem;
