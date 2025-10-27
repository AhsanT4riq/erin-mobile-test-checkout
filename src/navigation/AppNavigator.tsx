import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProductScreen from '../screens/ProductScreen';
import ThankYouScreen from '../screens/ThankYouScreen';

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
