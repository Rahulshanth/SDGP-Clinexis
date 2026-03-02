import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Consultation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patientId: Types.ObjectId;

  @Prop({ required: true })
  fullTranscript: string;

  @Prop({ type: [String], required: true })
  conversationParagraphs: string[];
}

export const ConsultationSchema =
  SchemaFactory.createForClass(Consultation);

  // Created on 25th Feb - By Rahul