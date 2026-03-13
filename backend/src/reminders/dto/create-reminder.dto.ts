// All by Vidu  Updated on 2026/03/10
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsISO8601,
  IsOptional,
} from 'class-validator';
import { ReminderType } from '../schemas/reminder.schema';

export class CreateReminderDto {
  @IsEnum(ReminderType)
  type: ReminderType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsISO8601()
  reminderTime: string;
}

export class AppointmentCancelledDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  doctorName: string;
}

export class CreateRemindersFromConsultationDto {
  @IsString()
  @IsNotEmpty()
  consultationId: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsOptional()
  doctorId?: string;

  @IsString()
  @IsNotEmpty()
  fullTranscript: string;
}
