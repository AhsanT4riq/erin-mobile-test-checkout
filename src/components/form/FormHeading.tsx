import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface FormHeadingProps {
  title: string;
}

const FormHeading: FC<FormHeadingProps> = ({ title }) => {
  return (
    <Text variant="titleMedium" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
});

export default FormHeading;
