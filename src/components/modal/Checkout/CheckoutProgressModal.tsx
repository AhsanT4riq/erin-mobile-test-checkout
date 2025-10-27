import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import HeadlineSmall from '../../shared/Headline';
import { CheckoutProgressModalProps } from '../../../types/checkout';
import Step from './Step';

const CheckoutProgressModal: FC<CheckoutProgressModalProps> = ({
  visible,
  steps,
  onRetry,
  onClose,
}) => {
  const hasError = steps.some(step => step.status === 'error');
  const allCompleted = steps.every(step => step.status === 'completed');

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.content}>
          <HeadlineSmall
            title={hasError ? 'Order Failed' : 'Processing Order'}
            style={styles.title}
          />

          {/* Steps */}
          <View style={styles.stepsContainer}>
            {steps.map(step => (
              <Step key={step.id} step={step} />
            ))}
          </View>

          {/* Error Actions */}
          {hasError && (
            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={onClose}
                style={styles.closeButton}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={onRetry}
                style={styles.retryButton}
              >
                Try Again
              </Button>
            </View>
          )}

          {/* Processing Message */}
          {!hasError && !allCompleted && (
            <Text variant="bodyMedium" style={styles.processingMessage}>
              Please wait while we process your order...
            </Text>
          )}
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
  title: {
    textAlign: 'center',
  },
  content: {
    alignItems: 'stretch',
  },
  stepsContainer: {
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  closeButton: {
    flex: 1,
    borderColor: '#6200ee',
  },
  retryButton: {
    flex: 1,
  },
  processingMessage: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
});

export default CheckoutProgressModal;
