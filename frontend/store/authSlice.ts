import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  user: null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunk — SignIn
export const SignInUser = createAsyncThunk(
  "auth/SignIn",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://10.31.13.60:5001/auth/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("SignIn failed");

      const data = await response.json();

      // Save token to AsyncStorage so doctorApi.ts can read it later
      await AsyncStorage.setItem("accessToken", data.accessToken);

      return data.accessToken;
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  },
);

// Thunk — Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      email: string;
      password: string;
      role: string;
      profile: {
        name: string;
        specialization?: string;
        hospitalName?: string;
        phoneNumber?: string;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://10.31.13.60:5001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Registration failed");

      return await response.json();
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
//Just created a place holder from Github Copilot to export authSlice by Rahul
