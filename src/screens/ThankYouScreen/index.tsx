import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ThankYouScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ThankYou'>;

interface ThankYouScreenProps {
    navigation: ThankYouScreenNavigationProp;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>✓</Text>
                </View>

                {/* Thank You Message */}
                <Text variant="headlineMedium" style={styles.title}>
                    Thank You!
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    Your order has been placed successfully
                </Text>

                {/* Order Details Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Order Details
                        </Text>
                        <Divider style={styles.divider} />

                        <View style={styles.detailRow}>
                            <Text variant="bodyMedium" style={styles.label}>
                                Order Number:
                            </Text>
                            <Text variant="bodyMedium" style={styles.value}>
                                #ORD-2024-1234
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text variant="bodyMedium" style={styles.label}>
                                Order Date:
                            </Text>
                            <Text variant="bodyMedium" style={styles.value}>
                                Oct 22, 2025
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text variant="bodyMedium" style={styles.label}>
                                Total Amount:
                            </Text>
                            <Text variant="bodyMedium" style={[styles.value, styles.amount]}>
                                $171.96
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Delivery Information Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Delivery Information
                        </Text>
                        <Divider style={styles.divider} />

                        <Text variant="bodyMedium" style={styles.addressText}>
                            123 Main Street, Apt 4B
                        </Text>
                        <Text variant="bodyMedium" style={styles.addressText}>
                            New York, NY 10001
                        </Text>
                        <Text variant="bodyMedium" style={styles.addressText}>
                            United States
                        </Text>

                        <View style={styles.estimateContainer}>
                            <Text variant="bodyMedium" style={styles.estimateLabel}>
                                Estimated Delivery:
                            </Text>
                            <Text variant="bodyLarge" style={styles.estimateDate}>
                                Oct 27 - Oct 29, 2025
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Next Steps Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            What's Next?
                        </Text>
                        <Divider style={styles.divider} />

                        <View style={styles.stepContainer}>
                            <Text variant="bodyMedium" style={styles.stepNumber}>
                                1.
                            </Text>
                            <Text variant="bodyMedium" style={styles.stepText}>
                                You'll receive a confirmation email shortly
                            </Text>
                        </View>

                        <View style={styles.stepContainer}>
                            <Text variant="bodyMedium" style={styles.stepNumber}>
                                2.
                            </Text>
                            <Text variant="bodyMedium" style={styles.stepText}>
                                We'll send you tracking information when your order ships
                            </Text>
                        </View>

                        <View style={styles.stepContainer}>
                            <Text variant="bodyMedium" style={styles.stepNumber}>
                                3.
                            </Text>
                            <Text variant="bodyMedium" style={styles.stepText}>
                                Track your order status in your account
                            </Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Support Info */}
                <Card style={[styles.card, styles.supportCard]}>
                    <Card.Content>
                        <Text variant="bodyMedium" style={styles.supportText}>
                            Need help? Contact our support team at support@example.com
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomButton}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.homeButton}
                    contentStyle={styles.buttonContent}>
                    Return to Shopping
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
        alignItems: 'center',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    iconText: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    card: {
        marginBottom: 16,
        elevation: 2,
        width: '100%',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    divider: {
        marginVertical: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    label: {
        color: '#666',
    },
    value: {
        fontWeight: '600',
    },
    amount: {
        color: '#6200ee',
        fontSize: 16,
    },
    addressText: {
        marginVertical: 2,
    },
    estimateContainer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    estimateLabel: {
        color: '#666',
        marginBottom: 4,
    },
    estimateDate: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    stepContainer: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    stepNumber: {
        marginRight: 12,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    stepText: {
        flex: 1,
        color: '#666',
    },
    supportCard: {
        backgroundColor: '#e3f2fd',
    },
    supportText: {
        textAlign: 'center',
        color: '#1976d2',
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
