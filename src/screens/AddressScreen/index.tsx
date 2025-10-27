import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/Headline';
import DeliveryAddressForm from '../../components/address/DeliveryAddressForm';
import DeliveryOptions from '../../components/address/DeliveryOptions';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';

type AddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Address'
>;

interface AddressScreenProps {
  navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Delivery Address" />

        <DeliveryAddressForm />

        {/* Delivery Options */}
        <DeliveryOptions />
      </ContentContainer>

      {/* Bottom Navigation Buttons */}
      <View style={styles.bottomButtons}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.backButton]}
          contentStyle={styles.buttonContent}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Payment')}
          style={[styles.button, styles.nextButton]}
          contentStyle={styles.buttonContent}
        >
          Continue to Payment
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
