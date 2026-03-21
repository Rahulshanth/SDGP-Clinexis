import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import summaryApi from "../services/summaryApi";
import {
  CurrentSummaryData,
  GenerateSummaryPayload,
  SummaryHistoryItem,
} from "../types";

interface SummaryState {
  currentSummary: CurrentSummaryData | null;
  history: SummaryHistoryItem[];
  loadingCurrent: boolean;
  loadingHistory: boolean;
  generating: boolean;
  error: string | null;
}

const initialState: SummaryState = {
  currentSummary: null,
  history: [],
  loadingCurrent: false,
  loadingHistory: false,
  generating: false,
  error: null,
};

export const fetchCurrentSummary = createAsyncThunk(
  "summary/fetchCurrentSummary",
  async (consultationId: string, thunkAPI) => {
    try {
      return await summaryApi.getCurrentSummary(consultationId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to load current summary"
      );
    }
  }
);

export const generateConsultationSummary = createAsyncThunk(
  "summary/generateConsultationSummary",
  async (payload: GenerateSummaryPayload, thunkAPI) => {
    try {
      return await summaryApi.generateSummary(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to generate summary"
      );
    }
  }
);

export const fetchSummaryHistory = createAsyncThunk(
  "summary/fetchSummaryHistory",
  async (_, thunkAPI) => {
    try {
      return await summaryApi.getSummaryHistory();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to load summary history"
      );
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    clearCurrentSummary: (state) => {
      state.currentSummary = null;
    },
    clearSummaryError: (state) => {
      state.error = null;
    },
    setCurrentSummaryLocally: (
      state,
      action: PayloadAction<CurrentSummaryData>
    ) => {
      state.currentSummary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentSummary.pending, (state) => {
        state.loadingCurrent = true;
        state.error = null;
      })
      .addCase(fetchCurrentSummary.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.currentSummary = action.payload;
      })
      .addCase(fetchCurrentSummary.rejected, (state, action) => {
        state.loadingCurrent = false;
        state.error = action.payload as string;
      })

      .addCase(generateConsultationSummary.pending, (state) => {
        state.generating = true;
        state.error = null;
      })
      .addCase(generateConsultationSummary.fulfilled, (state, action) => {
        state.generating = false;
        state.currentSummary = action.payload;
      })
      .addCase(generateConsultationSummary.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSummaryHistory.pending, (state) => {
        state.loadingHistory = true;
        state.error = null;
      })
      .addCase(fetchSummaryHistory.fulfilled, (state, action) => {
        state.loadingHistory = false;
        state.history = action.payload;
      })
      .addCase(fetchSummaryHistory.rejected, (state, action) => {
        state.loadingHistory = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCurrentSummary,
  clearSummaryError,
  setCurrentSummaryLocally,
} = summarySlice.actions;

export default summarySlice.reducer;