import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import modalReducer, {
  showErrorModal,
  showPushModal,
  showSuccessModal,
  showWarnModal,
} from './modalReducer';
import authReducer, {removeTokenFromStorage, saveToken} from './authReducer';
import i18nReducer from './i18nReducer';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    i18n: i18nReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;

interface ModalMethods extends EnhancedStore {
  push: (data: {title: string; description: string}) => void;
  error: (data: {title: string; description: string}) => void;
  warn: (data: {title: string; description: string}) => void;
  success: (data: {title: string; description: string}) => void;
}

const modal = store as ModalMethods;

modal.push = (data: {title: string; description: string}) => {
  store.dispatch(showPushModal(data));
};

modal.error = (data: {title: string; description: string}) => {
  store.dispatch(showErrorModal(data));
};

modal.warn = (data: {title: string; description: string}) => {
  store.dispatch(showWarnModal(data));
};

modal.success = (data: {title: string; description: string}) => {
  store.dispatch(showSuccessModal(data));
};

interface authMethods extends EnhancedStore {
  save: (token: string) => void;
  delete: () => void;
}

export const auth = store as authMethods;

auth.save = (token: string) => {
  saveToken(token)(store.dispatch);
};

auth.delete = () => {
  removeTokenFromStorage()(store.dispatch);
};

export default modal;
