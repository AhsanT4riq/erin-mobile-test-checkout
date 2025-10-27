import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddressScreen from '../screens/AddressScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ThankYouScreen from '../screens/ThankYouScreen';
import ProductScreen from '../screens/ProductScreen';

export type RootStackParamList = {
  Product: undefined;
  Cart: undefined;
  Details: undefined;
  Address: undefined;
  Payment: undefined;
  ThankYou: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Your Details' }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{ title: 'Delivery Address' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYouScreen}
        options={{ title: 'Order Complete', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
