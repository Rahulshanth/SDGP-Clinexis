// services/api.ts
//import { EXPO_PUBLIC_API_URL } from '@env';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// CREATE AXIOS INSTANCE

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://10.31.13.60:5001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
// Attach JWT Automatically

api.interceptors.request.use(
  async (config) =>  {
    try {
      //const token = await AsyncStorage.getItem("accessToken"); Changed by Rahul
      const token = await AsyncStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// RESPONSE INTERCEPTOR
// Handle Global Errors

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.log("Network Error");
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      console.log("Unauthorized - Logging out");
      await AsyncStorage.removeItem("accessToken");
    }

    if (status >= 500) {
      console.log("Server error occurred");
    }

    return Promise.reject(error);
  },
);

export default api;

// Created by Rahul on 28th Feb
