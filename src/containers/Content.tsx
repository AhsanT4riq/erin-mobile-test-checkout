import React, { FC } from 'react';
import { StyleSheet, ScrollView, ScrollViewProps } from 'react-native';

interface ContentContainerProps extends ScrollViewProps {
  children: React.ReactNode;
}

const ContentContainer: FC<ContentContainerProps> = ({
  children,
  ...props
}) => {
  const { contentContainerStyle, ...restProps } = props;
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
});

export default ContentContainer;
