import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACK_URL}/api/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const access_token = Cookies.get("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        Cookies.set("access_token", data.access_token);
        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    }
    return Promise.reject(error);
  }
);
