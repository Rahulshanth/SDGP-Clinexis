// ALL ADD by VIDU*
import { Injectable } from '@nestjs/common';

interface DummyReminder {
  patientId: string;
  type: 'MEDICINE' | 'APPOINTMENT';
  reminderTime: Date;
  message: string;
  sent: boolean;
}

@Injectable()
export class RemindersService {
  private reminders: DummyReminder[] = [
    {
      patientId: 'patient-001',
      type: 'MEDICINE',
      reminderTime: new Date(new Date().getTime() - 60000),
      message: 'Take morning medicine',
      sent: false,
    },
  ];

  createReminder(data: any) {
    const reminder: DummyReminder = {
      patientId: data.patientId,
      type: data.type,
      reminderTime: new Date(data.reminderTime),
      message: data.message,
      sent: false,
    };

    this.reminders.push(reminder);
    return reminder;
  }

  getPendingReminders() {
    const now = new Date();
    return this.reminders.filter(
      (reminder) => !reminder.sent && reminder.reminderTime <= now,
    );
  }

  markAsSent(reminder: DummyReminder) {
    reminder.sent = true;
  }
}
