export namespace Base {
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string;
    status?: number;
  }

  export interface ApiRequest<T> {
    data: T;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    timeout?: number;
  }
}
