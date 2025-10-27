import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CartItem from '../../components/cart/CartItem';
import OrderSummary from '../../components/cart/OrderSummary';
import HeadlineSmall from '../../components/shared/Headline';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import BottomButtons from '../../containers/BottomButton';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/rootStore';
import { Cart } from '../../graphql/types';
import { Text } from 'react-native-paper';
import {
  useClearCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from '../../graphql/hooks';
import { CartItem as CartItemType } from '../../graphql/types';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = observer(({ navigation }) => {
  const { cart } = useStores();
  const [updateCartItem, { loading: isUpdatingCartItem }] = useUpdateCartItem();
  const [removeFromCart, { loading: isRemovingFromCart }] = useRemoveFromCart();
  const [clearCart, { loading: isClearingCart, error: clearCartError }] =
    useClearCart();
  const defaultShippingCost = 10; // Standard shipping cost

  const orderSummary: Partial<Cart> = {
    subtotal: cart.subtotal,
    shipping: defaultShippingCost,
    tax: cart.tax,
    total: cart.getTotal(defaultShippingCost),
  };

  const handleUpdateCartItem = (item: CartItemType) => {
    updateCartItem({
      variables: {
        input: {
          cartId: cart.cartId!,
          productId: item.productId,
          quantity: item.quantity,
        },
      },
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    cart.removeItem(productId);
    removeFromCart({
      variables: { cartId: cart.cartId!, productId },
    });
  };

  const handleClearCart = () => {
    try {
      clearCart({ variables: { cartId: cart.cartId! } });
      cart.clearCart();
      navigation.goBack();
    } catch (error: any) {
      const errorMessage =
        error?.message || clearCartError?.message || 'Failed to clear cart';
      Alert.alert('Error', errorMessage);
    }
  };

  if (cart.isEmpty) {
    return (
      <Container>
        <ContentContainer scrollEnabled={false}>
          <HeadlineSmall title="Your Shopping Cart" />
          <Text>Your cart is empty</Text>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Your Shopping Cart" />

        {/* Cart Items */}
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            removeItem={handleRemoveFromCart}
            updateCartItem={handleUpdateCartItem}
            isRemovingItem={isRemovingFromCart}
            isUpdatingItem={isUpdatingCartItem}
          />
        ))}

        {/* Order Summary */}
        <OrderSummary summary={orderSummary} />
      </ContentContainer>

      {/* Bottom Action Button */}
      <BottomButtons style={styles.bottomButtons}>
        <Button
          mode="outlined"
          onPress={handleClearCart}
          style={styles.backButton}
        >
          {isClearingCart ? 'Processing...' : 'Clear Cart'}
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Details')}
          style={styles.proceedButton}
        >
          Proceed to Checkout
        </Button>
      </BottomButtons>
    </Container>
  );
});

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    borderRadius: 8,
  },
  proceedButton: {
    borderRadius: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default CartScreen;
