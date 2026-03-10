// ALL ADD by VIDU* code updated on 2026/03/04

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'PHARMACY';
export type ReminderType = 'MEDICINE' | 'APPOINTMENT' | 'NOTIFICATION';

export interface Reminder {
  id: string;
  userId: string;
  userRole: UserRole;
  type: ReminderType;
  title: string;
  message: string;
  reminderTime: Date;
  sent: boolean;
}

@Injectable()
export class RemindersService {
  private reminders: Reminder[] = [];

  // 🔹 CREATE GENERAL REMINDER
  createReminder(data: {
    userId: string;
    userRole: UserRole;
    type: ReminderType;
    title: string;
    message: string;
    reminderTime: string;
  }): Reminder {
    const reminder: Reminder = {
      id: uuidv4(),
      userId: data.userId,
      userRole: data.userRole,
      type: data.type,
      title: data.title,
      message: data.message,
      reminderTime: new Date(data.reminderTime),
      sent: false,
    };

    this.reminders.push(reminder);
    return reminder;
  }

  // CREATE MEDICINE REMINDER (PATIENT)
  createMedicineReminder(data: {
    patientId: string;
    title: string;
    message: string;
    reminderTime: string;
  }): Reminder {
    return this.createReminder({
      userId: data.patientId,
      userRole: 'PATIENT',
      type: 'MEDICINE',
      title: data.title,
      message: data.message,
      reminderTime: data.reminderTime,
    });
  }

  //  APPOINTMENT CANCELLATION (Doctor to Patient)
  notifyAppointmentCancelled(data: {
    patientId: string;
    doctorName: string;
  }): Reminder {
    return this.createReminder({
      userId: data.patientId,
      userRole: 'PATIENT',
      type: 'NOTIFICATION',
      title: 'Appointment Cancelled',
      message: `Dr. ${data.doctorName} has cancelled your appointment.`,
      reminderTime: new Date().toISOString(),
    });
  }

  //  GET REMINDERS FOR USER
  getUserReminders(userId: string): Reminder[] {
    return this.reminders.filter((r) => r.userId === userId);
  }

  // DELETE REMINDER
  deleteReminder(id: string): boolean {
    const index = this.reminders.findIndex((r) => r.id === id);
    if (index === -1) return false;

    this.reminders.splice(index, 1);
    return true;
  }

  // GET PENDING (FOR SCHEDULER)
  getPendingReminders(): Reminder[] {
    const now = new Date();
    return this.reminders.filter(
      (reminder) => !reminder.sent && reminder.reminderTime <= now,
    );
  }

  // MARK AS SENT
  markAsSent(reminder: Reminder): void {
    reminder.sent = true;
  }
}
