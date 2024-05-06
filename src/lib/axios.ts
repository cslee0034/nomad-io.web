import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/config";

const authRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    const response = await fetch("/api/auth/cookie");
    const data = await response.json();
    const accessToken = data.accessToken;

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["x-access-token"] = accessToken;
    }

    return config;
  } catch (error) {
    throw new Error("Failed to get access token.");
  }
};

const refreshTokenInterceptor = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = await fetch("/api/auth/refresh");
    const data = await response.json();
    const accessToken = data.accessToken;

    if (accessToken) {
      originalRequest.headers["x-access-token"] = accessToken.value;
      return axios(originalRequest);
    }
  }

  return Promise.reject(error);
};

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(undefined, refreshTokenInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
