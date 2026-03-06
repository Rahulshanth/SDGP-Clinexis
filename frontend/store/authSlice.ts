import { createSlice } from "@reduxjs/toolkit";

//Just created a place holder from Github Copilot to export authSlice by RAHUL

interface AuthState {
  user: null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
//Just created a place holder from Github Copilot to export authSlice by Rahul