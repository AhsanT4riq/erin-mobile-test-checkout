import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/shared/Headline';
import ContactInfoForm from '../../components/details/ContactInfoForm';
import Container from '../../containers/Container';
import ContentContainer from '../../containers/Content';
import BottomButtons from '../../containers/BottomButton';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <ContentContainer>
        <HeadlineSmall title="Personal Information" />

        {/* Personal Information */}
        <ContactInfoForm />
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
          onPress={() => navigation.navigate('Address')}
          style={[styles.button, styles.nextButton]}
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
  nextButton: {},
});

export default DetailsScreen;
