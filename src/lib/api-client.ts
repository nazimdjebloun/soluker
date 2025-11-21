import axios, { AxiosRequestConfig, Method } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async <T = unknown>(
  method: Method,
  endpoint: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  const response = await apiClient.request<T>({
    method,
    url: endpoint,
    data,
    ...config,
  });
  return response.data;
};

export default apiClient;

