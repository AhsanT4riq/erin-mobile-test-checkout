import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface HeadlineProps {
  title: string;
}

const HeadlineSmall: FC<HeadlineProps> = ({ title }) => {
  return (
    <Text variant="headlineSmall" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

export default HeadlineSmall;
