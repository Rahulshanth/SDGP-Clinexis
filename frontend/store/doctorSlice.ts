import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchDoctorsBySpecialization } from '../services/doctorApi';

// Type definition for one doctor
export interface Doctor {
  _id: string;
  email: string;
  role: string;
  profile: {
    name: string;
    specialization: string;
    hospitalName: string;
    phoneNumber: string;
  };
}

interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
};

// Thunk — calls the API function and returns doctor list
export const fetchDoctorsBySpecialization = createAsyncThunk(
  'doctor/fetchBySpecialization',
  async (specialization: string, { rejectWithValue }) => {
    try {
      return await searchDoctorsBySpecialization(specialization);
    } catch (error) {
      return rejectWithValue('Failed to fetch doctors');
    }
  },
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    // Clears results when search bar is cleared
    clearDoctors(state) {
      state.doctors = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsBySpecialization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;