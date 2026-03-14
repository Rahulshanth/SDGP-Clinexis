import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import consultationSlice from "./consultationSlice";
import summarySlice from "./summarySlice";
import reminderSlice from "./reminder.Slice"; // ← added by Vidu

export const store = configureStore({
  reducer: {
    auth: authSlice,
    consultation: consultationSlice,
    summary: summarySlice,
    reminders: reminderSlice, // ← added by Vidu
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
