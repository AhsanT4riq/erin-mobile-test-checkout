import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CartItem from '../../components/cart/CartItem';
import OrderSummary from '../../components/cart/OrderSummary';
import HeadlineSmall from '../../components/shared/Headline';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import { CartItem as CartItemType } from '../../types/cart';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const cartItems: CartItemType[] = [
    {
      id: '1',
      name: 'Product Name 1',
      description: 'Product description goes here',
      price: 29.99,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Product Name 2',
      description: 'Product description goes here',
      price: 49.99,
      quantity: 2,
    },
    {
      id: '3',
      name: 'Product Name 3',
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
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Your Shopping Cart" />

        {/* Cart Items */}
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}

        {/* Order Summary */}
        <OrderSummary summary={orderSummary} />
      </ContentContainer>

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
    </Container>
  );
};

const styles = StyleSheet.create({
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
