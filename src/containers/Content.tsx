import React, { FC } from 'react';
import { StyleSheet, ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface ContentContainerProps extends ScrollViewProps {
  children: React.ReactNode;
}

const ContentContainer: FC<ContentContainerProps> = ({ children, ...props }) => {
  const { contentContainerStyle, ...restProps } = props;
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      {...restProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
});

export default ContentContainer;
