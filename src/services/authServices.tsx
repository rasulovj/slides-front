import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { AxiosError } from "axios";
import { LoginPayload, LoginResponse } from "@/types";

const login = async (userData: LoginPayload): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", userData);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    retry: false,
  });
};

const register = async (userData: LoginPayload): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/register", userData);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useRegister = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: register,
    retry: false,
  });
};

const getMe = async (): Promise<LoginResponse> => {
  try {
    const { data } = await api.get<LoginResponse>("/users/me");
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useGetMe = () => {
  return useQuery<LoginResponse, Error>({
    queryKey: ["getMe"],
    queryFn: getMe,
    retry: false,
  });
};
