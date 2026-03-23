// store/reminder.Slice.ts — Created by Vidu
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getMyReminders,
  createMedicineReminder,
  deleteReminder,
  createRemindersFromConsultation,
} from "../services/reminderApi";
import {
  Reminder,
  CreateMedicineReminderPayload,
  CreateReminderFromConsultationPayload,
} from "../types/reminder.types";

interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
}

const initialState: ReminderState = {
  reminders: [],
  loading: false,
  error: null,
};

// FETCH all reminders for logged in patient
export const fetchReminders = createAsyncThunk(
  "reminders/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getMyReminders();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// CREATE medicine reminder manually
export const addMedicineReminder = createAsyncThunk(
  "reminders/addMedicine",
  async (payload: CreateMedicineReminderPayload, thunkAPI) => {
    try {
      return await createMedicineReminder(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// CREATE reminders from consultation transcript
export const addRemindersFromConsultation = createAsyncThunk(
  "reminders/fromConsultation",
  async (payload: CreateReminderFromConsultationPayload, thunkAPI) => {
    try {
      return await createRemindersFromConsultation(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// DELETE reminder
export const removeReminder = createAsyncThunk(
  "reminders/delete",
  async (id: string, thunkAPI) => {
    try {
      await deleteReminder(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    clearReminderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchReminders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchReminders.fulfilled,
      (state, action: PayloadAction<Reminder[]>) => {
        state.loading = false;
        state.reminders = action.payload;
      },
    );
    builder.addCase(fetchReminders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ADD MEDICINE REMINDER
    builder.addCase(
      addMedicineReminder.fulfilled,
      (state, action: PayloadAction<Reminder>) => {
        state.reminders.push(action.payload);
      },
    );

    // ADD FROM CONSULTATION
    builder.addCase(
      addRemindersFromConsultation.fulfilled,
      (state, action: PayloadAction<Reminder[]>) => {
        state.reminders.push(...action.payload);
      },
    );

    // DELETE
    builder.addCase(
      removeReminder.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.reminders = state.reminders.filter(
          (r) => r._id !== action.payload,
        );
      },
    );
  },
});

export const { clearReminderError } = reminderSlice.actions;
export default reminderSlice.reducer;
