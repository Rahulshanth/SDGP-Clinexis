import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import consultationSlice from './consultationSlice';
import summarySlice from './summarySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    consultation: consultationSlice,
    summary: summarySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
