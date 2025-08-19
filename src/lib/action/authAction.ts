import api from '@lib/api/api';
import {Base} from '.';
import {AxiosError} from 'axios';
import {auth} from '@lib/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApiLoginParam = Base.ApiRequest<AuthLoginParam>;

type AuthLoginParam = {
  username: string;
  password: string;
};

type AuthLoginResponse = {
  token: string;
};

type ApiRegisterParam = Base.ApiRequest<AuthRegisterParam>;

type AuthRegisterParam = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type AuthRegisterResponse = {
  token: string;
};

export async function authLogin({
  data,
}: ApiLoginParam): Promise<Base.ApiResponse<AuthLoginResponse>> {
  try {
    const response = await api.post(
      'https://ygevo.myvnc.com/nba/api/v1/app/login',
      data,
    );
    auth.save(response.data.token);
    await AsyncStorage.setItem('profile', JSON.stringify(response.data));

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{message: string; errors: string}>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function authRegister({
  data,
}: ApiRegisterParam): Promise<Base.ApiResponse<AuthRegisterResponse>> {
  try {
    const response = await api.post(
      'https://ygevo.myvnc.com/nba/api/v1/app/register',
      data,
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{message: string; errors: string}>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}
