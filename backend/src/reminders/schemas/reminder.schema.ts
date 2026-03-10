// All by Vidu  Updated on 2026/03/10
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ReminderDocument = Reminder & Document;

export enum ReminderType {
  MEDICINE = 'MEDICINE',
  APPOINTMENT = 'APPOINTMENT',
  NOTIFICATION = 'NOTIFICATION',
}

@Schema({ timestamps: true })
export class Reminder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  patientId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  doctorId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' })
  consultationId: string;

  @Prop({ required: true, enum: ReminderType })
  type: ReminderType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  reminderTime: Date;

  @Prop({ default: false })
  sent: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
