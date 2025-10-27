import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

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
