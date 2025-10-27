import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { CartLine } from '../../store/cart/CartLine';

interface CartItemProps {
  item: CartLine;
  removeItem: (id: string) => void;
}

const CartItem: FC<CartItemProps> = ({ item, removeItem }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.gap}>
        <View style={styles.itemRow}>
          <View style={styles.itemDetails}>
            <Text variant="titleMedium">{item.productName}</Text>
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
        <View style={styles.itemRow}>
          <Button mode="contained" onPress={() => removeItem(item.productId)}>
            Remove
          </Button>
          <View style={[styles.itemRow, styles.gap]}>
            <Button
              mode={item.quantity === 1 ? 'outlined' : 'contained'}
              disabled={item.quantity === 1}
              onPress={() => item.decrement()}
            >
              -
            </Button>

            <Button mode="contained" onPress={() => item.increment()}>
              +
            </Button>
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
  gap: {
    gap: 8,
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
