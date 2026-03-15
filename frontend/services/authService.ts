import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", payload);

  if (response.data?.accessToken) {
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
  }

  return response.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("accessToken");
};

export const getStoredToken = async () => {
  return AsyncStorage.getItem("accessToken");
};

export const getPatientRecords = async () => {
  const response = await api.get("/patient/records");
  return response.data;
};