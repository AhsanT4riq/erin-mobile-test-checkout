import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Loader from '../../components/modal/Loader';
import MessageModal from '../../components/modal/Message';
import ProductItem from '../../components/product/ProductItem';
import HeadlineSmall from '../../components/shared/Headline';
import BottomButtons from '../../containers/BottomButton';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import { products } from '../../data/products';
import { useAddToCart, useCreateCart } from '../../graphql/hooks';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useStores } from '../../store/rootStore';
import { Product } from '../../types/product';

type ProductScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Product'>;

interface ProductScreenProps {
  navigation: ProductScreenNavigationProp;
}

const ProductScreen: React.FC<ProductScreenProps> = observer(({ navigation }) => {
  const { cart } = useStores();
  const [createCart, { loading: isCreatingCart }] = useCreateCart();
  const [addToCart, { loading: isAddingToCart }] = useAddToCart();
  const isProcessing = isCreatingCart || isAddingToCart;
  const [processingError, setProcessingError] = React.useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    cart.addItem(product);
  };

  const handleProceedToCart = async () => {
    try {
      const cartResult = await createCart({ variables: {} });

      if (!cartResult.data) {
        setProcessingError('Cart is empty');
        return;
      }

      const cartId = cartResult.data?.createCart.id;

      if (cartId) {
        setProcessingError('Cart creation failed');
        return;
      }

      // Set the cart ID in the checkout store
      cart.setCartId(cartId);

      for (const item of cart.items) {
        await addToCart({
          variables: {
            cartId,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }

      navigation.navigate('Cart');
    } catch (error: any) {
      const errorMessage = error?.message || processingError || 'Failed to proceed to checkout';
      setProcessingError(errorMessage);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Choose products" />

        {products.map((product) => (
          <ProductItem key={product.id} item={product} addToCart={() => handleAddToCart(product)} />
        ))}
      </ContentContainer>
      {!cart.isEmpty && (
        <BottomButtons style={styles.cartButtonContainer}>
          <Text variant="titleMedium">
            Cart {cart.itemCount === 1 ? 'item' : 'items'}: {cart.itemCount}
          </Text>
          <Button
            mode="contained"
            onPress={handleProceedToCart}
            labelStyle={styles.label}
            style={styles.proceedButton}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed To Cart'}
          </Button>
        </BottomButtons>
      )}

      <Loader visible={isProcessing} />
      <MessageModal
        visible={!!processingError}
        message={processingError || ''}
        onClose={() => setProcessingError(null)}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  cartButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  proceedButton: {
    borderRadius: 8,
  },
  label: {
    color: 'white',
  },
});

export default ProductScreen;
