import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import consultationSlice from './consultationSlice';
import summarySlice from './summarySlice';
import doctorReducer from './doctorSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    consultation: consultationSlice,
    summary: summarySlice,
    doctor: doctorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
