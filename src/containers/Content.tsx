import React, { FC } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
});

export default ContentContainer;
