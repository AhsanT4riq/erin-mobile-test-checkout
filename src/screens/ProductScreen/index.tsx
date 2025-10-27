import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/shared/Headline';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import ProductItem from '../../components/product/ProductItem';
import { IconButton } from 'react-native-paper';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Product'
>;

interface ProductScreenProps {
  navigation: ProductScreenNavigationProp;
}

const ProductScreen: React.FC<ProductScreenProps> = () => {
  const products = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 49.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Product 3',
      price: 19.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Product 4',
      price: 29.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      name: 'Product 5',
      price: 49.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      name: 'Product 6',
      price: 19.99,
      description: 'Product description goes here',
      image: 'https://via.placeholder.com/150',
    },
  ];

  // dynamically set headerRight
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerRight: () => (

  //       ),
  //     });
  //   }, [navigation]);

  return (
    <Container>
      <ContentContainer>
        <IconButton
          icon="cart"
          //   iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log('Pressed')}
        />
        <HeadlineSmall title="Choose products" />

        {products.map(product => (
          <ProductItem key={product.id} item={product} />
        ))}
      </ContentContainer>
    </Container>
  );
};

export default ProductScreen;
