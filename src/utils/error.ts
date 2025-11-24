import { AxiosError } from "axios";

export interface ApiErrorShape {
  statusCode?: number;
  message: string;
  details?: unknown;
}

export const toApiError = (error: unknown): ApiErrorShape => {
  const fallback: ApiErrorShape = { message: "알 수 없는 오류가 발생했습니다." };

  if (!error) return fallback;

  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<any>;
    const statusCode = axiosError.response?.status;
    const message = axiosError.response?.data?.message || axiosError.message;
    const details = axiosError.response?.data;
    return { statusCode, message, details };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return fallback;
};


