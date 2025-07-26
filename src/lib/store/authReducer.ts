import {
  createSlice,
  Dispatch,
  PayloadAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from './store';

const initialState = {
  token: null as string | null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const loadToken = () => async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch(authSlice.actions.setToken(token));
    }
  } catch (error) {
    console.error('Failed to load token', error);
  }
};

export const saveToken =
  (token: string) => async (dispatch: Dispatch<UnknownAction>) => {
    try {
      await AsyncStorage.setItem('token', token);
      dispatch(authSlice.actions.setToken(token));
    } catch (error) {
      console.error('Failed to save token', error);
    }
  };

export const removeTokenFromStorage =
  () => async (dispatch: Dispatch<UnknownAction>) => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(authSlice.actions.removeToken());
    } catch (error) {
      console.error('Failed to remove token', error);
    }
  };

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;

export default authSlice.reducer;
