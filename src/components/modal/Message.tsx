import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';

import HeadlineSmall from '../shared/Headline';

interface MessageModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const MessageModal: FC<MessageModalProps> = ({ visible, message, onClose }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
        testID="message"
      >
        <View style={styles.content}>
          <HeadlineSmall title={'Oops!'} />
          <Text variant="bodyMedium">{message}.</Text>
          <Button mode="contained" onPress={onClose} style={styles.proceedButton}>
            Close
          </Button>
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
  proceedButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});

export default MessageModal;
