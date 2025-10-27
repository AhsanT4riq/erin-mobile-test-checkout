import React, { useEffect } from 'react';
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
import { useAddressForm } from '../../hooks/useAddressForm';
import { useStores } from '../../store/rootStore';

type AddressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Address'
>;

interface AddressScreenProps {
  navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid },
  } = useAddressForm();
  const { address } = useStores();

  useEffect(() => {
    if (address.isComplete) {
      reset(address.toFormData(), {
        keepDirty: false,
        keepTouched: false,
        keepErrors: false,
        keepIsSubmitted: false,
      });
      trigger();
    }
  }, [address.isComplete, reset, address, trigger]);

  const handleContinue = handleSubmit(data => {
    // Only save to local store - no API call yet
    address.setAddressData(data);
    navigation.navigate('Payment');
  });
  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Delivery Address" />

        <DeliveryAddressForm control={control} />

        {/* Delivery Options */}
        <DeliveryOptions control={control} />
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
          onPress={handleContinue}
          style={[styles.button]}
          disabled={!isValid}
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
