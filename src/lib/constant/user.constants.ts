import {BoardItem} from '@component/Card/Board';

export interface RecordApiParams {
  random: string[];
  content: BoardItem;
  name: string;
  type: string;
}

export interface RecordApiResponse {
  data: string;
  success: boolean;
}

export interface favoriteApiParams {
  teamId: string;
}

export interface favoriteApiResponse {}
