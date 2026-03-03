//updated by vidu on 2026/03/03

export class CreateReminderDto {
  userId: string;
  userRole: 'PATIENT' | 'DOCTOR' | 'PHARMACY';
  type: 'MEDICINE' | 'APPOINTMENT' | 'NOTIFICATION';
  title: string;
  message: string;
  reminderTime: string;
}
