import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; //ALL ADD by VIDU
import { Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema({ timestamps: true })
export class Reminder {
  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true, enum: ['MEDICINE', 'APPOINTMENT'] })
  type: string;

  @Prop({ required: true })
  reminderTime: Date;

  @Prop()
  message: string;

  @Prop({ default: false })
  sent: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
