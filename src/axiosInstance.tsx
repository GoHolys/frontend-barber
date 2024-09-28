import axios from "axios";
import { auth } from "./auth";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await auth();
    if (session?.backendTokens.accessToken) {
      config.headers.Authorization = `Bearer ${session.backendTokens.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
