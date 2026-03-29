// types/reminder.types.ts — Created by Vidu

export enum ReminderType {
  MEDICINE = "MEDICINE",
  APPOINTMENT = "APPOINTMENT",
  NOTIFICATION = "NOTIFICATION",
}

export interface Reminder {
  _id: string;
  patientId: string;
  doctorId?: string;
  consultationId?: string;
  type: ReminderType;
  title: string;
  message: string;
  reminderTime: string;
  sent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderFromConsultationPayload {
  consultationId: string;
  patientId: string;
  doctorId?: string;
  fullTranscript: string;
}

export interface CreateMedicineReminderPayload {
  type: ReminderType;
  title: string;
  message: string;
  reminderTime: string;
}

export interface AppointmentCancelledPayload {
  patientId: string;
  doctorName: string;
}
