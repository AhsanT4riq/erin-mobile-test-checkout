import React from 'react';
import { StyleSheet } from 'react-native';
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

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = observer(({ navigation }) => {
  const { cart } = useStores();

  const orderSummary: Partial<Cart> = {
    subtotal: cart.subtotal,
    shipping: cart.shippingFlat,
    tax: cart.tax,
    total: cart.total,
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
          <CartItem key={item.id} item={item} removeItem={cart.removeItem} />
        ))}

        {/* Order Summary */}
        <OrderSummary summary={orderSummary} />
      </ContentContainer>

      {/* Bottom Action Button */}
      <BottomButtons>
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
  proceedButton: {
    borderRadius: 8,
  },
});

export default CartScreen;
