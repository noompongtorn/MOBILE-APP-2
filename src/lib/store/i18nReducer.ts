import {
  createSlice,
  Dispatch,
  PayloadAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  language: 'th' as string | null,
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const loadLanguage = () => async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const Language = await AsyncStorage.getItem('language');
    if (Language) {
      dispatch(i18nSlice.actions.setLanguage(Language));
    }
  } catch (error) {
    console.error('Failed to load language', error);
  }
};

export const saveLanguage =
  (Language: string) => async (dispatch: Dispatch<UnknownAction>) => {
    try {
      await AsyncStorage.setItem('language', Language);
      dispatch(i18nSlice.actions.setLanguage(Language));
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

export default i18nSlice.reducer;
