// All by Vidu  Updated on 2026/03/10
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reminder,
  ReminderDocument,
  ReminderType,
} from './schemas/reminder.schema';
import {
  CreateReminderDto,
  AppointmentCancelledDto,
  CreateRemindersFromConsultationDto,
} from './dto/create-reminder.dto';

// Timing keywords extracted from fullTranscript
const TIMING_MAP: Record<string, { hour: number; minute: number }> = {
  morning: { hour: 7, minute: 0 },
  afternoon: { hour: 13, minute: 0 },
  evening: { hour: 18, minute: 0 },
  night: { hour: 21, minute: 0 },
  noon: { hour: 12, minute: 0 },
  bedtime: { hour: 22, minute: 0 },
};

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name)
    private reminderModel: Model<ReminderDocument>,
  ) {}

  // CORE: Extract timing keywords from transcript and create reminders
  async createRemindersFromConsultation(
    dto: CreateRemindersFromConsultationDto,
  ): Promise<Reminder[]> {
    const transcript = dto.fullTranscript.toLowerCase();
    const createdReminders: Reminder[] = [];

    for (const [keyword, time] of Object.entries(TIMING_MAP)) {
      if (transcript.includes(keyword)) {
        const reminderTime = new Date();
        reminderTime.setHours(time.hour, time.minute, 0, 0);

        // If time already passed today, schedule for tomorrow
        if (reminderTime < new Date()) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const reminder = new this.reminderModel({
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          consultationId: dto.consultationId,
          type: ReminderType.MEDICINE,
          title: `Medicine Reminder (${keyword})`,
          message: `Time to take your medicine. Doctor's note: ${dto.fullTranscript}`,
          reminderTime,
          sent: false,
        });

        const saved = await reminder.save();
        createdReminders.push(saved);
      }
    }

    return createdReminders;
  }

  // PATIENT: Create manual medicine reminder
  async createMedicineReminder(
    patientId: string,
    dto: CreateReminderDto,
  ): Promise<Reminder> {
    const reminder = new this.reminderModel({
      patientId,
      type: ReminderType.MEDICINE,
      title: dto.title,
      message: dto.message,
      reminderTime: new Date(dto.reminderTime),
      sent: false,
    });
    return reminder.save();
  }

  // DOCTOR: Notify patient of appointment cancellation
  async notifyAppointmentCancelled(
    dto: AppointmentCancelledDto,
  ): Promise<Reminder> {
    const reminder = new this.reminderModel({
      patientId: dto.patientId,
      type: ReminderType.NOTIFICATION,
      title: 'Appointment Cancelled',
      message: `Dr. ${dto.doctorName} has cancelled your appointment.`,
      reminderTime: new Date(),
      sent: false,
    });
    return reminder.save();
  }

  // PATIENT: Get own reminders
  async getUserReminders(patientId: string): Promise<Reminder[]> {
    return this.reminderModel
      .find({ patientId })
      .sort({ reminderTime: 1 })
      .exec();
  }

  // PATIENT: Delete reminder
  async deleteReminder(id: string): Promise<{ deleted: boolean }> {
    const result = await this.reminderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Reminder with id ${id} not found`);
    }
    return { deleted: true };
  }

  // SCHEDULER: Get pending reminders
  async getPendingReminders(): Promise<ReminderDocument[]> {
    const now = new Date();
    return this.reminderModel
      .find({ sent: false, reminderTime: { $lte: now } })
      .exec();
  }

  // SCHEDULER: Mark as sent
  async markAsSent(id: string): Promise<void> {
    await this.reminderModel.findByIdAndUpdate(id, { sent: true }).exec();
  }
}
