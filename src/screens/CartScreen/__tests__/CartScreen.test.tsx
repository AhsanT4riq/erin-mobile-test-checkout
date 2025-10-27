import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import CartScreen from '../index';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any;

describe('CartScreen', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <CartScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Your Shopping Cart')).toBeTruthy();
        expect(screen.getByText('Order Summary')).toBeTruthy();
        expect(screen.getByText('Proceed to Checkout')).toBeTruthy();
    });

    it('displays cart items', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <CartScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Product Name 1')).toBeTruthy();
        expect(screen.getByText('Product Name 2')).toBeTruthy();
        expect(screen.getByText('Product Name 3')).toBeTruthy();
    });
});
