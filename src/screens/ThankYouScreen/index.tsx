import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import DeliveryInfoCard from '../../components/thankyou/DeliveryInfoCard';
import NextSteps from '../../components/thankyou/NextSteps';
import OrderDetailsCard from '../../components/thankyou/OrderDetailsCard';
import SuccessMessage from '../../components/thankyou/Success';
import SupportCard from '../../components/thankyou/SupportCard';
import BottomButtons from '../../containers/BottomButton';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useStores } from '../../store/rootStore';
import { OrderDetails } from '../../types/order';
import { formatAddress } from '../../utils/address';
import { formatDateRange } from '../../utils/date';

type ThankYouScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ThankYou'
>;

interface ThankYouScreenProps {
  navigation: ThankYouScreenNavigationProp;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ navigation }) => {
  const { order } = useStores();

  const orderDetails: OrderDetails = {
    orderNumber: order.orderNumber,
    orderDate: order.orderDate,
    orderTotal: order.orderTotal,
    shippingAddress: formatAddress(order.shippingAddress!),
    estimatedDeliveryDate: formatDateRange(
      order.estimatedDeliveryStart,
      order.estimatedDeliveryEnd,
    ),
  };

  const handleReturnToShopping = () => {
    // Clear order store
    order.clear();
    navigation.navigate('Product');
  };

  return (
    <Container>
      <ContentContainer contentContainerStyle={styles.scrollContent}>
        {/* Success Icon & Message */}
        <SuccessMessage />

        {/* Order Details Card */}
        <OrderDetailsCard orderDetails={orderDetails} />

        {/* Delivery Information Card */}
        <DeliveryInfoCard orderDetails={orderDetails} />

        {/* Next Steps Card */}
        <NextSteps />

        {/* Support Info */}
        <SupportCard email="support@example.com" />
      </ContentContainer>

      {/* Bottom Button */}
      <BottomButtons>
        <Button
          mode="contained"
          onPress={handleReturnToShopping}
          style={styles.homeButton}
        >
          Return to Shopping
        </Button>
      </BottomButtons>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
  },
  homeButton: {
    borderRadius: 8,
  },
  itemsCard: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  itemsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemQuantity: {
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    fontWeight: '600',
  },
});

export default ThankYouScreen;
