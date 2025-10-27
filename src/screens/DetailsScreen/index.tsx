import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import ContactInfoForm from '../../components/details/ContactInfoForm';
import HeadlineSmall from '../../components/shared/Headline';
import BottomButtons from '../../containers/BottomButton';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import { useDetailsForm } from '../../hooks/useDetailsForm';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useStores } from '../../store/rootStore';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid },
  } = useDetailsForm();
  const { user } = useStores();

  // Reset form when user data is complete
  useEffect(() => {
    if (user.isComplete) {
      reset(user.toFormData(), {
        keepDirty: false,
        keepTouched: false,
        keepErrors: false,
        keepIsSubmitted: false,
      });
      trigger();
    }
  }, [user.isComplete, reset, user, trigger]);

  const handleContinue = handleSubmit(data => {
    // Only save to local store - no API call yet
    user.setUserData(data);
    navigation.navigate('Address');
  });

  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Personal Information" />

        {/* Personal Information */}
        <ContactInfoForm control={control} />
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
          Continue
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

export default DetailsScreen;
