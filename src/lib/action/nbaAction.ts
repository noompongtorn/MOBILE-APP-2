import api from '@lib/api/api';
import { Base } from '.';
import { AxiosError } from 'axios';
import {
  HomePageApiResponse,
  MyfavoritePageApiResponse,
  TotalHistoryResponse,
  historyListTeamResult,
} from '@lib/constant/nba.contants';

export async function homePageListApi(): Promise<
  Base.ApiResponse<HomePageApiResponse>
> {
  try {
    const response = await api.get(
      'https://ygevo.myvnc.com/nba/api/v1/app/home-page.list',
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function homePageListWNBAApi(): Promise<
  Base.ApiResponse<HomePageApiResponse>
> {
  try {
    const response = await api.get(
      'https://ygevo.myvnc.com/wnba/api/v1/app/wnba-page.list',
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function favoritePageListApi(
  type: number,
): Promise<Base.ApiResponse<MyfavoritePageApiResponse>> {
  try {
    let endpoint =
      type === 0
        ? 'https://ygevo.myvnc.com/nba/api/v1/app'
        : 'https://ygevo.myvnc.com/wnba/api/v1/app';

    const response = await api.post(`${endpoint}/favorite-page.list`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function historyListTeamApi({
  type,
  teamId,
}: historyListTeamResult): Promise<Base.ApiResponse<HomePageApiResponse>> {
  try {
    let endpoint =
      type === 0
        ? 'https://ygevo.myvnc.com/nba/api/v1/app'
        : 'https://ygevo.myvnc.com/wnba/api/v1/app';

    const response = await api.get(`${endpoint}/history.list?teamId=${teamId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function totalTeamApi({
  type,
  teamId,
}: historyListTeamResult): Promise<Base.ApiResponse<TotalHistoryResponse>> {
  try {
    let endpoint =
      type === 0
        ? 'https://ygevo.myvnc.com/nba/api/v1/app'
        : 'https://ygevo.myvnc.com/wnba/api/v1/app';

    const response = await api.get(`${endpoint}/totals?teamId=${teamId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}

export async function totalhistoryApi(
  type: number,
): Promise<Base.ApiResponse<TotalHistoryResponse>> {
  try {
    let endpoint =
      type === 0
        ? 'https://ygevo.myvnc.com/nba/api/v1/app'
        : 'https://ygevo.myvnc.com/wnba/api/v1/app';

    const response = await api.get(`${endpoint}/totals`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string; errors: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to fetch items',
    };
  }
}
