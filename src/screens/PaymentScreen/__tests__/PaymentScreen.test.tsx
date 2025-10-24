import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import PaymentScreen from '../index';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any;

describe('PaymentScreen', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <PaymentScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Payment Information')).toBeTruthy();
        expect(screen.getByText('Place Order')).toBeTruthy();
    });

    it('displays order summary', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <PaymentScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Order Summary')).toBeTruthy();
        expect(screen.getByText('$171.96')).toBeTruthy();
    });
});
