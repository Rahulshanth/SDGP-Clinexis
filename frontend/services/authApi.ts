import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export type SignInPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  role: string;
  profile: {
    fullName: string;
  };
};

export type SignInResponse = {
  user: any;
  accessToken: string;
};

export const signInUser = async (
  payload: SignInPayload
): Promise<SignInResponse> => {
  const response = await api.post("/auth/SignIn", payload);

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