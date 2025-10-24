import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

interface CartScreenProps {
    navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineSmall" style={styles.title}>
                    Your Shopping Cart
                </Text>

                {/* Cart Item 1 */}
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.itemRow}>
                            <View style={styles.itemDetails}>
                                <Text variant="titleMedium">Product Name 1</Text>
                                <Text variant="bodyMedium" style={styles.description}>
                                    Product description goes here
                                </Text>
                                <Text variant="bodySmall" style={styles.price}>
                                    $29.99
                                </Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text variant="bodyMedium">Qty: 1</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Cart Item 2 */}
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.itemRow}>
                            <View style={styles.itemDetails}>
                                <Text variant="titleMedium">Product Name 2</Text>
                                <Text variant="bodyMedium" style={styles.description}>
                                    Product description goes here
                                </Text>
                                <Text variant="bodySmall" style={styles.price}>
                                    $49.99
                                </Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text variant="bodyMedium">Qty: 2</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Cart Item 3 */}
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.itemRow}>
                            <View style={styles.itemDetails}>
                                <Text variant="titleMedium">Product Name 3</Text>
                                <Text variant="bodyMedium" style={styles.description}>
                                    Product description goes here
                                </Text>
                                <Text variant="bodySmall" style={styles.price}>
                                    $19.99
                                </Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text variant="bodyMedium">Qty: 1</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Order Summary */}
                <Card style={[styles.card, styles.summaryCard]}>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.summaryTitle}>
                            Order Summary
                        </Text>
                        <Divider style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text variant="bodyLarge">Subtotal:</Text>
                            <Text variant="bodyLarge">$149.96</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text variant="bodyLarge">Shipping:</Text>
                            <Text variant="bodyLarge">$10.00</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text variant="bodyLarge">Tax:</Text>
                            <Text variant="bodyLarge">$12.00</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text variant="titleLarge" style={styles.totalText}>
                                Total:
                            </Text>
                            <Text variant="titleLarge" style={styles.totalText}>
                                $171.96
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Bottom Action Button */}
            <View style={styles.bottomButton}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Details')}
                    style={styles.proceedButton}
                    contentStyle={styles.buttonContent}>
                    Proceed to Checkout
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
        marginBottom: 12,
        elevation: 2,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemDetails: {
        flex: 1,
    },
    description: {
        color: '#666',
        marginTop: 4,
    },
    price: {
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    quantityContainer: {
        justifyContent: 'center',
        marginLeft: 16,
    },
    summaryCard: {
        marginTop: 8,
        backgroundColor: '#fff',
    },
    summaryTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
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
    proceedButton: {
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});

export default CartScreen;
