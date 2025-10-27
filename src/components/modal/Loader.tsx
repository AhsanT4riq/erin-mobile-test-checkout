import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, ActivityIndicator } from 'react-native-paper';
import HeadlineSmall from '../shared/Headline';

const Loader: FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.content}>
          <HeadlineSmall title="Processing..." />
          <ActivityIndicator />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 12,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
