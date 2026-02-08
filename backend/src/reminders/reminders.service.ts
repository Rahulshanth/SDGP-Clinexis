import { Injectable } from '@nestjs/common'; // ALL ADD by VIDU

interface DummyReminder {
  patientId: string;
  type: 'MEDICINE' | 'APPOINTMENT';
  reminderTime: Date;
  message: string;
  sent: boolean;
}

@Injectable()
export class RemindersService {
  // add by vidu
  private reminders: DummyReminder[] = [
    {
      patientId: 'patient-001',
      type: 'MEDICINE',
      reminderTime: new Date(new Date().getTime() - 60000), // 1 min ago
      message: 'Take morning medicine',
      sent: false,
    },
  ];

  // add by vidu
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

  // add by vidu
  getPendingReminders() {
    const now = new Date();
    return this.reminders.filter(
      (reminder) => !reminder.sent && reminder.reminderTime <= now,
    );
  }

  // add by vidu
  markAsSent(reminder: DummyReminder) {
    reminder.sent = true;
  }
}
