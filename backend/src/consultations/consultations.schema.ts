import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConsultationDocument = HydratedDocument<Consultation>;

@Schema({ timestamps: true })
export class Consultation {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patientId: Types.ObjectId;

  @Prop({
  type: [
    {
      sender: { type: String, enum: ['doctor', 'patient'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  default: [],
})
messages: {
  sender: 'doctor' | 'patient';
  text: string;
  timestamp: Date;
}[];
  @Prop()
  summary: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);