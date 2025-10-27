import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Product } from '../../types/product';
import { Card, Text, Button } from 'react-native-paper';

interface ProductItemProps {
  item: Product;
  addToCart: () => void;
}

const ProductItem: FC<ProductItemProps> = ({ item, addToCart }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
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
        </View>
        <Button mode="contained" onPress={addToCart}>
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  content: {
    gap: 16,
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
});

export default ProductItem;
