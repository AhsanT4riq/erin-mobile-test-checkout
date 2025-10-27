import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/shared/Headline';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import ProductItem from '../../components/product/ProductItem';
import { Button } from 'react-native-paper';
import { useStores } from '../../store/rootStore';
import { Product } from '../../types/product';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from 'react-native-paper';
import BottomButtons from '../../containers/BottomButton';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

interface ProductScreenProps {
  navigation: ProductScreenNavigationProp;
}

const ProductScreen: React.FC<ProductScreenProps> = observer(
  ({ navigation }) => {
    const { cart } = useStores();
    const products: Product[] = [
      {
        id: '1',
        productId: '1',
        productName: 'Product 1',
        price: 29.99,
        description: 'Product description goes here',
      },
      {
        id: '2',
        productId: '2',
        productName: 'Product 2',
        price: 49.99,
        description: 'Product description goes here',
      },
      {
        id: '3',
        productId: '3',
        productName: 'Product 3',
        price: 19.99,
        description: 'Product description goes here',
      },
      {
        id: '4',
        productId: '4',
        productName: 'Product 4',
        price: 29.99,
        description: 'Product description goes here',
      },
      {
        id: '5',
        productId: '5',
        productName: 'Product 5',
        price: 49.99,
        description: 'Product description goes here',
      },
      {
        id: '6',
        productId: '6',
        productName: 'Product 6',
        price: 19.99,
        description: 'Product description goes here',
      },
    ];

    const handleAddToCart = (product: Product) => {
      console.log('Add to cart', product);
      cart.addItem(product);
    };

    return (
      <Container>
        <ContentContainer>
          <HeadlineSmall title="Choose products" />

          {products.map(product => (
            <ProductItem
              key={product.id}
              item={product}
              addToCart={() => handleAddToCart(product)}
            />
          ))}
        </ContentContainer>
        {!cart.isEmpty && (
          <BottomButtons style={styles.cartButtonContainer}>
            <Text variant="titleMedium">
              Cart {cart.itemCount === 1 ? 'item' : 'items'}: {cart.itemCount}
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Cart')}
              labelStyle={{ color: 'white' }}
              style={styles.proceedButton}
            >
              Proceed To Cart
            </Button>
          </BottomButtons>
        )}
      </Container>
    );
  },
);

const styles = StyleSheet.create({
  cartButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  proceedButton: {
    borderRadius: 8,
  },
});

export default ProductScreen;
