// src/store/modalSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the Modal State Interface with title and description
interface ModalState {
  push: {
    visible: boolean;
    title: string | null | undefined;
    description: string | null | undefined;
  };
  error: {
    visible: boolean;
    title: string | null | undefined;
    description: string | null | undefined;
  };
  warn: {
    visible: boolean;
    title: string | null | undefined;
    description: string | null | undefined;
  };
  success: {
    visible: boolean;
    title: string | null | undefined;
    description: string | null | undefined;
  };
}

// Initial state for modals
const initialState: ModalState = {
  push: {visible: false, title: null, description: null},
  error: {visible: false, title: null, description: null},
  warn: {visible: false, title: null, description: null},
  success: {visible: false, title: null, description: null},
};

// Create the modal slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showPushModal(
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) {
      state.push = {visible: true, ...action.payload};
    },
    hidePushModal(state) {
      state.push = {visible: false, title: null, description: null};
    },
    showErrorModal(
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) {
      state.error = {visible: true, ...action.payload};
    },
    hideErrorModal(state) {
      state.error = {visible: false, title: null, description: null};
    },
    showWarnModal(
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) {
      state.warn = {visible: true, ...action.payload};
    },
    hideWarnModal(state) {
      state.warn = {visible: false, title: null, description: null};
    },
    showSuccessModal(
      state,
      action: PayloadAction<{title: string; description: string}>,
    ) {
      state.success = {visible: true, ...action.payload};
    },
    hideSuccessModal(state) {
      state.success = {visible: false, title: null, description: null};
    },
  },
});

// Export the actions for use in components
export const {
  showPushModal,
  hidePushModal,
  showErrorModal,
  hideErrorModal,
  showWarnModal,
  hideWarnModal,
  showSuccessModal,
  hideSuccessModal,
} = modalSlice.actions;

// Export the modal slice reducer
export default modalSlice.reducer;
