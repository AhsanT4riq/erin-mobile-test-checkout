import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import AddressScreen from '../index';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any;

describe('AddressScreen', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <AddressScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Delivery Address')).toBeTruthy();
        expect(screen.getByText('Continue to Payment')).toBeTruthy();
    });

    it('displays delivery method options', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <AddressScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Standard Shipping')).toBeTruthy();
        expect(screen.getByText('Express Shipping')).toBeTruthy();
        expect(screen.getByText('Next Day Delivery')).toBeTruthy();
    });
});
