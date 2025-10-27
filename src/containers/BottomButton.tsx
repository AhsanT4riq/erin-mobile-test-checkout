import React, { FC } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomButtonsProps extends ViewProps {
  children: React.ReactNode;
}

const BottomButtons: FC<BottomButtonsProps> = ({ children, ...props }) => {
  const { style } = props;
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: safeAreaInsets.bottom },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default BottomButtons;
