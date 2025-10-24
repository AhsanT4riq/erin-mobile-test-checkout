import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Card } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type AddressScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Address'>;

interface AddressScreenProps {
    navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineSmall" style={styles.title}>
                    Delivery Address
                </Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="bodyMedium" style={styles.sectionDescription}>
                            Where should we deliver your order?
                        </Text>

                        {/* Address Line 1 */}
                        <TextInput
                            label="Street Address"
                            mode="outlined"
                            style={styles.input}
                            placeholder="123 Main Street"
                        />

                        {/* Address Line 2 */}
                        <TextInput
                            label="Apartment, Suite, etc. (Optional)"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Apt 4B"
                        />

                        {/* City */}
                        <TextInput
                            label="City"
                            mode="outlined"
                            style={styles.input}
                            placeholder="New York"
                        />

                        {/* State/Province and ZIP in a row */}
                        <View style={styles.row}>
                            <TextInput
                                label="State/Province"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="NY"
                            />
                            <TextInput
                                label="ZIP/Postal Code"
                                mode="outlined"
                                style={[styles.input, styles.halfInput]}
                                placeholder="10001"
                            />
                        </View>

                        {/* Country */}
                        <TextInput
                            label="Country"
                            mode="outlined"
                            style={styles.input}
                            placeholder="United States"
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Delivery Instructions
                        </Text>

                        <TextInput
                            label="Special Delivery Instructions (Optional)"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Leave at front door, call on arrival, etc."
                            multiline
                            numberOfLines={3}
                        />
                    </Card.Content>
                </Card>

                {/* Delivery Options */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Delivery Method
                        </Text>

                        <View style={styles.deliveryOption}>
                            <Text variant="bodyLarge">Standard Shipping</Text>
                            <Text variant="bodyMedium" style={styles.deliveryDetail}>
                                5-7 business days - $10.00
                            </Text>
                        </View>

                        <View style={styles.deliveryOption}>
                            <Text variant="bodyLarge">Express Shipping</Text>
                            <Text variant="bodyMedium" style={styles.deliveryDetail}>
                                2-3 business days - $25.00
                            </Text>
                        </View>

                        <View style={styles.deliveryOption}>
                            <Text variant="bodyLarge">Next Day Delivery</Text>
                            <Text variant="bodyMedium" style={styles.deliveryDetail}>
                                1 business day - $50.00
                            </Text>
                        </View>
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
                    onPress={() => navigation.navigate('Payment')}
                    style={[styles.button, styles.nextButton]}
                    contentStyle={styles.buttonContent}>
                    Continue to Payment
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
    sectionDescription: {
        marginBottom: 16,
        color: '#666',
    },
    sectionTitle: {
        marginBottom: 12,
        fontWeight: 'bold',
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
    deliveryOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    deliveryDetail: {
        color: '#666',
        marginTop: 4,
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

export default AddressScreen;
