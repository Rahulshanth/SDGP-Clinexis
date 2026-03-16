// store/consultationSlice.ts

import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";
import {uploadAudio, getConsultations,getConsultationById,} from "../services/consultationApi";
import { LoadingState } from "../types/common.types";
import {Consultation, ConsultationUploadResponse,} from "../types/consultation.types";

interface ConsultationState {
  consultations: Consultation[];           // list shown on home screen
  activeConsultationParagraphs: string[];  // paragraphs of ONE opened consultation
  lastUpload: ConsultationUploadResponse | null; // result of last audio upload
  status: LoadingState;                    // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null;
}

const initialState: ConsultationState = {
  consultations: [],
  activeConsultationParagraphs: [],
  lastUpload: null,
  status: "idle",
  error: null,
};


export const uploadConsultationAudio = createAsyncThunk<
  ConsultationUploadResponse,   
  FormData,                     
  { rejectValue: string }       
>(
  "consultation/uploadAudio",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await uploadAudio(formData);  
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to upload audio"
      );
    }
  }
);

export const fetchConsultations = createAsyncThunk<
  Consultation[],
  void,
  { rejectValue: string }
>(
  "consultation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getConsultations();
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to fetch consultations"
      );
    }
  }
);


export const fetchConsultationById = createAsyncThunk<
  string[],       // we only store paragraphs in state
  string,         // the consultation ID you pass in
  { rejectValue: string }
>(
  "consultation/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const consultation = await getConsultationById(id); // ✅ already returns Consultation
      return consultation.conversationParagraphs; 
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to fetch consultation"
      );
    }
  }
);


const consultationSlice = createSlice({
  name: "consultation",
  initialState,

  reducers: {
    clearActiveConsultation(state) {
      state.activeConsultationParagraphs = [];
      state.status = "idle";
      state.error = null;
    },

    resetConsultationState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── Upload audio ──────────────────────────────────────
      .addCase(uploadConsultationAudio.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(uploadConsultationAudio.fulfilled, (state, action) => {
        state.status     = "succeeded";
        state.lastUpload = action.payload; // { consultationId, paragraphs }
      })
      .addCase(uploadConsultationAudio.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload ?? "Upload failed";
      })

      // ── Fetch all consultations ───────────────────────────
      .addCase(fetchConsultations.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.status        = "succeeded";
        state.consultations = action.payload;
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload ?? "Fetch failed";
      })

      // ── Fetch single consultation ─────────────────────────
      .addCase(fetchConsultationById.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(fetchConsultationById.fulfilled, (state, action) => {
        state.status                     = "succeeded";
        state.activeConsultationParagraphs = action.payload;
      })
      .addCase(fetchConsultationById.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload ?? "Fetch failed";
      });
  },
});

export const { clearActiveConsultation, resetConsultationState } =
  consultationSlice.actions;

export default consultationSlice.reducer;