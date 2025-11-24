import axios, { AxiosError, AxiosInstance } from "axios";
import { API_BASE_URL } from "@env";

let httpClient: AxiosInstance | null = null;

export const getHttpClient = (): AxiosInstance => {
  if (httpClient) return httpClient;

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  instance.interceptors.request.use((config) => {
    // 필요 시 토큰 주입 위치
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // 공통 에러 처리 훅
      return Promise.reject(error);
    }
  );

  httpClient = instance;
  return instance;
};

export default getHttpClient;


