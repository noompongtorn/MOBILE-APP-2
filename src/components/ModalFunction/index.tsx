// src/components/ModalComponent.tsx
import Button from '@component/Button';
import Typography from '@component/Typography';
import {
  hideErrorModal,
  hidePushModal,
  hideSuccessModal,
  hideWarnModal,
} from '@lib/store/modalReducer';
import { RootState } from '@lib/store/store';
import React from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const { height } = Dimensions.get('screen');

const ModalComponent = () => {
  const dispatch = useDispatch();

  // Properly typed useSelector with RootState
  const { push, error, warn, success } = useSelector(
    (state: RootState) => state.modal,
  );

  // Helper to render modals based on state
  const renderModal = (
    modalType: 'push' | 'error' | 'warn' | 'success',
    visible: boolean,
    title: string | null,
    description: string | null,
    hideModal: () => void,
  ) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={hideModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && <Typography styleProps={styles.modalTitle} text={title} />}

          {description && <Typography text={description} />}

          <Button
            styleProps={styles.modalStickyButton}
            text="Close"
            onPress={hideModal}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {renderModal(
        'push',
        push.visible,
        push.title ?? '',
        push.description ?? '',
        () => dispatch(hidePushModal()),
      )}
      {renderModal(
        'error',
        error.visible,
        error.title ?? '',
        error.description ?? '',
        () => dispatch(hideErrorModal()),
      )}
      {renderModal(
        'warn',
        warn.visible,
        warn.title ?? '',
        warn.description ?? '',
        () => dispatch(hideWarnModal()),
      )}
      {renderModal(
        'success',
        success.visible,
        success.title ?? '',
        success.description ?? '',
        () => dispatch(hideSuccessModal()),
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#00000070',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    minHeight: height * 0.4,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Prompt-Regular',
  },
  modalStickyButton: { position: 'absolute', bottom: 24 },
});

export default ModalComponent;
