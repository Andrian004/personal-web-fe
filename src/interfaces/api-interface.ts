export interface SuccessResponse<T> {
  message?: string;
  body: T;
  pagination?: {
    totalPages: number;
    currentPage: number;
  };
}

export interface ErrorResponse {
  message: string;
}
