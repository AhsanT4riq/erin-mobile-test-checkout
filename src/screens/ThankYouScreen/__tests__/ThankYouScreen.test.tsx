import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import ThankYouScreen from '../index';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any;

describe('ThankYouScreen', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <ThankYouScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Thank You!')).toBeTruthy();
        expect(screen.getByText('Your order has been placed successfully')).toBeTruthy();
        expect(screen.getByText('Return to Shopping')).toBeTruthy();
    });

    it('displays order details', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <ThankYouScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Order Details')).toBeTruthy();
        expect(screen.getByText('#ORD-2024-1234')).toBeTruthy();
    });
});
