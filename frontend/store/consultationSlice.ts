import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadAudio, getConsultations, getConsultationById } from "../services/consultationApi";
import { Consultation } from "../types/consultation.types";

interface ConsultationState {
  consultations: Consultation[];       // list of all consultations
  paragraphs: string[];                // paragraphs of one opened consultation
  loading: boolean;
  error: string | null;
}

const initialState: ConsultationState = {
  consultations: [],
  paragraphs: [],
  loading: false,
  error: null,
};

// Thunk 1: Upload audio
export const uploadConsultationAudio = createAsyncThunk(
  "consultation/uploadAudio",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await uploadAudio(formData);
    } catch (error) {
      return rejectWithValue("Failed to upload audio");
    }
  }
);

// Thunk 2: Fetch all consultations
export const fetchConsultations = createAsyncThunk(
  "consultation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getConsultations();
    } catch (error) {
      return rejectWithValue("Failed to fetch consultations");
    }
  }
);

// Thunk 3: Fetch single consultation by ID (ChatGPT's addition)
export const fetchConsultationById = createAsyncThunk(
  "consultation/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getConsultationById(id);
      return data.conversationParagraphs;
    } catch (error) {
      return rejectWithValue("Failed to fetch consultation");
    }
  }
);

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload audio
      .addCase(uploadConsultationAudio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadConsultationAudio.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadConsultationAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch all consultations
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch single consultation by ID
      .addCase(fetchConsultationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultationById.fulfilled, (state, action) => {
        state.loading = false;
        state.paragraphs = action.payload;
      })
      .addCase(fetchConsultationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default consultationSlice.reducer;