import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Card, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

interface PaymentScreenProps {
    navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineSmall" style={styles.title}>
                    Payment Information
                </Text>

                {/* Order Summary Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Order Summary
                        </Text>
                        <Divider style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text variant="bodyMedium">3 Items</Text>
                            <Text variant="bodyMedium">$149.96</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text variant="bodyMedium">Shipping</Text>
                            <Text variant="bodyMedium">$10.00</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text variant="bodyMedium">Tax</Text>
                            <Text variant="bodyMedium">$12.00</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text variant="titleLarge" style={styles.totalText}>
                                Total
                            </Text>
                            <Text variant="titleLarge" style={styles.totalText}>
                                $171.96
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Payment Method Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Payment Method
                        </Text>

                        <Text variant="bodyMedium" style={styles.sectionDescription}>
                            All transactions are secure and encrypted.
                        </Text>

                        {/* Card Number */}
                        <TextInput
                            label="Card Number"
                            mode="outlined"
                            style={styles.input}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="number-pad"
                        />

                        {/* Cardholder Name */}
                        <TextInput
                            label="Cardholder Name"
                            mode="outlined"
                            style={styles.input}
                            placeholder="John Doe"
                        />

                        {/* Expiry and CVV in a row */}
                        <View style={styles.row}>
                            <TextInput
                                label="Expiry Date"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="MM/YY"
                                keyboardType="number-pad"
                            />
                            <TextInput
                                label="CVV"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="123"
                                keyboardType="number-pad"
                                secureTextEntry
                            />
                        </View>
                    </Card.Content>
                </Card>

                {/* Billing Address Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Billing Address
                        </Text>

                        <View style={styles.checkboxRow}>
                            <Text variant="bodyMedium">Same as delivery address</Text>
                        </View>

                        <TextInput
                            label="Billing Address"
                            mode="outlined"
                            style={styles.input}
                            placeholder="123 Main Street"
                        />

                        <View style={styles.row}>
                            <TextInput
                                label="City"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="New York"
                            />
                            <TextInput
                                label="ZIP Code"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="10001"
                            />
                        </View>
                    </Card.Content>
                </Card>

                {/* Security Notice */}
                <Card style={[styles.card, styles.securityCard]}>
                    <Card.Content>
                        <Text variant="bodySmall" style={styles.securityText}>
                            🔒 Your payment information is encrypted and secure. We do not store your card
                            details.
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Bottom Navigation Buttons */}
            <View style={styles.bottomButtons}>
                <Button
                    mode="outlined"
                    onPress={() => navigation.goBack()}
                    style={[styles.button, styles.backButton]}
                    contentStyle={styles.buttonContent}>
                    Back
                </Button>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('ThankYou')}
                    style={[styles.button, styles.nextButton]}
                    contentStyle={styles.buttonContent}>
                    Place Order
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    title: {
        marginBottom: 16,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 16,
        elevation: 2,
    },
    sectionTitle: {
        marginBottom: 12,
        fontWeight: 'bold',
    },
    sectionDescription: {
        marginBottom: 16,
        color: '#666',
    },
    input: {
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    divider: {
        marginVertical: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    totalText: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    checkboxRow: {
        marginBottom: 16,
    },
    securityCard: {
        backgroundColor: '#f0f0f0',
    },
    securityText: {
        color: '#666',
        textAlign: 'center',
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        borderRadius: 8,
    },
    backButton: {
        borderColor: '#6200ee',
    },
    nextButton: {},
    buttonContent: {
        paddingVertical: 8,
    },
});

export default PaymentScreen;
