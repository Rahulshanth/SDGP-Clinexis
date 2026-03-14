// services/reminderApi.ts — Created by Vidu
import api from "./api";
import {
  Reminder,
  CreateReminderFromConsultationPayload,
  CreateMedicineReminderPayload,
  AppointmentCancelledPayload,
} from "../types/reminder.types";

// DOCTOR: Create reminders from consultation transcript
export const createRemindersFromConsultation = async (
  payload: CreateReminderFromConsultationPayload,
): Promise<Reminder[]> => {
  const response = await api.post("/reminders/from-consultation", payload);
  return response.data;
};

// PATIENT: Create manual medicine reminder
export const createMedicineReminder = async (
  payload: CreateMedicineReminderPayload,
): Promise<Reminder> => {
  const response = await api.post("/reminders/medicine", payload);
  return response.data;
};

// DOCTOR: Notify patient of appointment cancellation
export const notifyAppointmentCancelled = async (
  payload: AppointmentCancelledPayload,
): Promise<Reminder> => {
  const response = await api.post("/reminders/appointment-cancelled", payload);
  return response.data;
};

// PATIENT: Get own reminders
export const getMyReminders = async (): Promise<Reminder[]> => {
  const response = await api.get("/reminders/my");
  return response.data;
};

// PATIENT: Delete a reminder
export const deleteReminder = async (
  id: string,
): Promise<{ deleted: boolean }> => {
  const response = await api.delete(`/reminders/${id}`);
  return response.data;
};
