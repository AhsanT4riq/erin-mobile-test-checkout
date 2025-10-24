import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Card } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
    navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineSmall" style={styles.title}>
                    Personal Information
                </Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="bodyMedium" style={styles.sectionDescription}>
                            Please provide your contact information for order updates and delivery.
                        </Text>

                        {/* First Name */}
                        <TextInput
                            label="First Name"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Enter your first name"
                        />

                        {/* Last Name */}
                        <TextInput
                            label="Last Name"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Enter your last name"
                        />

                        {/* Email */}
                        <TextInput
                            label="Email Address"
                            mode="outlined"
                            style={styles.input}
                            placeholder="email@example.com"
                            keyboardType="email-address"
                        />

                        {/* Phone */}
                        <TextInput
                            label="Phone Number"
                            mode="outlined"
                            style={styles.input}
                            placeholder="+1 (555) 123-4567"
                            keyboardType="phone-pad"
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Additional Information
                        </Text>

                        {/* Company (Optional) */}
                        <TextInput
                            label="Company (Optional)"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Company name"
                        />

                        {/* Special Instructions */}
                        <TextInput
                            label="Special Instructions (Optional)"
                            mode="outlined"
                            style={styles.input}
                            placeholder="Any special delivery instructions"
                            multiline
                            numberOfLines={4}
                        />
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
                    onPress={() => navigation.navigate('Address')}
                    style={[styles.button, styles.nextButton]}
                    contentStyle={styles.buttonContent}>
                    Continue
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

export default DetailsScreen;
