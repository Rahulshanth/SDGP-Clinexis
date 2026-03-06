import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadAudio, getConsultations } from "../services/consultationApi";
import { Consultation } from "../types/consultation.types";

interface ConsultationState {
  consultations: Consultation[];
  loading: boolean;
}

const initialState: ConsultationState = {
  consultations: [],
  loading: false,
};

export const uploadConsultationAudio = createAsyncThunk(
  "consultation/uploadAudio",
  async (formData: FormData) => {
    return await uploadAudio(formData);
  }
);

export const fetchConsultations = createAsyncThunk(
  "consultation/fetch",
  async () => {
    return await getConsultations();
  }
);

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
      });
  },
});

export default consultationSlice.reducer;