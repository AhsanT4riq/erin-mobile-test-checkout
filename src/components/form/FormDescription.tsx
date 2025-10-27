import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface FormDescriptionProps {
  desc: string;
}

const FormDescription: FC<FormDescriptionProps> = ({ desc }) => {
  return (
    <Text variant="bodyMedium" style={styles.description}>
      {desc}
    </Text>
  );
};

const styles = StyleSheet.create({
  description: {
    marginBottom: 16,
    color: '#666',
  },
});

export default FormDescription;
