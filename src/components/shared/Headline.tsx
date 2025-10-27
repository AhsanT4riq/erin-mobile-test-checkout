import React, { FC } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface HeadlineProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const HeadlineSmall: FC<HeadlineProps> = ({ title, style }) => {
  return (
    <Text variant="headlineSmall" style={[styles.title, style]}>
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
