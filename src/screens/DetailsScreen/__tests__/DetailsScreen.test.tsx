import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import DetailsScreen from '../index';

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
} as any;

describe('DetailsScreen', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <DetailsScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByText('Personal Information')).toBeTruthy();
        expect(screen.getByText('Continue')).toBeTruthy();
        expect(screen.getByText('Back')).toBeTruthy();
    });

    it('displays input fields', () => {
        render(
            <PaperProvider>
                <NavigationContainer>
                    <DetailsScreen navigation={mockNavigation} />
                </NavigationContainer>
            </PaperProvider>,
        );

        expect(screen.getByPlaceholderText('Enter your first name')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your last name')).toBeTruthy();
        expect(screen.getByPlaceholderText('email@example.com')).toBeTruthy();
    });
});
