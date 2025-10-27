import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeadlineSmall from '../../components/Headline';
import ContactInfoForm from '../../components/details/ContactInfoForm';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface DetailsScreenProps {
  navigation: DetailsScreenNavigationProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeadlineSmall title="Personal Information" />

        {/* Personal Information */}
        <ContactInfoForm />
      </ScrollView>

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
          onPress={() => navigation.navigate('Address')}
          style={[styles.button, styles.nextButton]}
          contentStyle={styles.buttonContent}
        >
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
