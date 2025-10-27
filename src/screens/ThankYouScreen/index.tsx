import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import SuccessMessage from '../../components/thankyou/Success';
import OrderDetailsCard from '../../components/thankyou/OrderDetailsCard';
import DeliveryInfoCard from '../../components/thankyou/DeliveryInfoCard';
import NextSteps from '../../components/thankyou/NextSteps';
import SupportCard from '../../components/thankyou/SupportCard';

type ThankYouScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ThankYou'
>;

interface ThankYouScreenProps {
  navigation: ThankYouScreenNavigationProp;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ navigation }) => {
  const orderDetails = {
    orderNumber: '#ORD-2024-1234',
    orderDate: new Date(),
    totalAmount: 171.96,
    deliveryAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    estimatedDeliveryDate: 'Oct 27 - Oct 29, 2025',
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
      <View style={styles.bottomButton}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Cart')}
          style={styles.homeButton}
          contentStyle={styles.buttonContent}
        >
          Return to Shopping
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
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
  homeButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default ThankYouScreen;
