import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';

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
