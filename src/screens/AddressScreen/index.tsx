import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/shared/Headline';
import DeliveryAddressForm from '../../components/address/DeliveryAddressForm';
import DeliveryOptions from '../../components/address/DeliveryOptions';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import BottomButtons from '../../containers/BottomButton';

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
      <BottomButtons style={styles.bottomButtons}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.backButton]}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Payment')}
          style={[styles.button]}
        >
          Continue to Payment
        </Button>
      </BottomButtons>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
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
});

export default AddressScreen;
