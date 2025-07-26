import {AxiosError} from 'axios';
import {Base} from '.';
import api from '@lib/api/api';
import {
  RecordApiParams,
  RecordApiResponse,
  favoriteApiParams,
} from '@lib/constant/user.constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function recordNBAApi(
  type: number,
  data: RecordApiParams,
): Promise<Base.ApiResponse<RecordApiResponse>> {
  try {
    let endpoint = 'https://api-nba.cquiz.app/v1/app';

    const response = await api.post(`${endpoint}/record`, data);

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

export async function recordWNBAApi(
  type: number,
  data: RecordApiParams,
): Promise<Base.ApiResponse<RecordApiResponse>> {
  try {
    let endpoint = 'http://27.254.145.186:3006/v1/app';

    const response = await api.post(`${endpoint}/record`, data);

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

export async function favoriteApi(
  type: number,
  data: favoriteApiParams,
): Promise<Base.ApiResponse<RecordApiResponse>> {
  try {
    let endpoint =
      type === 0
        ? 'https://api-nba.cquiz.app/v1/app'
        : 'http://27.254.145.186:3006/v1/app';

    const response = await api.post(`${endpoint}/favorite`, data);

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

export async function getprofileApi(type: number) {
  try {
    let endpoint =
      type === 0
        ? 'https://api-nba.cquiz.app/v1/app'
        : 'http://27.254.145.186:3006/v1/app';

    const data = await AsyncStorage.getItem('profile');
    const _data = data ? JSON.parse(data) : null;

    const response = await api.get(
      `${endpoint}/profile/${_data?.user?.id.toString()}`,
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
