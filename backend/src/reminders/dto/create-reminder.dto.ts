// updated by vidu on 2026/03/03

import { IsString, IsEnum, IsNotEmpty, IsISO8601 } from 'class-validator';

//These define allowed values for roles and reminder types

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  PHARMACY = 'PHARMACY',
}

export enum ReminderType {
  MEDICINE = 'MEDICINE',
  APPOINTMENT = 'APPOINTMENT',
  NOTIFICATION = 'NOTIFICATION',
}

//Used to validate incoming reminder creation requests

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserRole)
  userRole: UserRole;

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
