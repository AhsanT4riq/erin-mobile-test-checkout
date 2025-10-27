import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CartItem from '../../components/cart/CartItem';
import OrderSummary from '../../components/cart/OrderSummary';
import HeadlineSmall from '../../components/Headline';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const cartItems = [
    {
      id: '1',
      title: 'Product Name 1',
      description: 'Product description goes here',
      price: 29.99,
      quantity: 1,
    },
    {
      id: '2',
      title: 'Product Name 2',
      description: 'Product description goes here',
      price: 49.99,
      quantity: 2,
    },
    {
      id: '3',
      title: 'Product Name 3',
      description: 'Product description goes here',
      price: 19.99,
      quantity: 1,
    },
  ];
  const orderSummary = {
    subtotal: 149.96,
    shipping: 10.0,
    tax: 12.0,
    total: 171.96,
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeadlineSmall title="Your Shopping Cart" />

        {/* Cart Item 1 */}
        <CartItem item={cartItems[0]} />

        {/* Cart Item 2 */}
        <CartItem item={cartItems[1]} />

        {/* Cart Item 3 */}
        <CartItem item={cartItems[2]} />

        {/* Order Summary */}
        <OrderSummary summary={orderSummary} />
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomButton}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Details')}
          style={styles.proceedButton}
          contentStyle={styles.buttonContent}
        >
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  proceedButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default CartScreen;
