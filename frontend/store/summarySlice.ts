import { createSlice } from "@reduxjs/toolkit";

//Just created a place holder from Github Copilot to export summarySlice by RAHUL

interface SummaryState {
  summary: null;
  loading: boolean;
}

const initialState: SummaryState = {
  summary: null,
  loading: false,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
});

export default summarySlice.reducer;
