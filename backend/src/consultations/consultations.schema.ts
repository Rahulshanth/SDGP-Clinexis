import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConsultationDocument = HydratedDocument<Consultation>;

@Schema({ timestamps: true })
export class Consultation {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patientId: Types.ObjectId;

  @Prop()
  audio: string;

  @Prop()
  transcription: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  summary: string;

  @Prop()
  summaryGeneratedAt: Date;

  @Prop()
  summaryVersion: number;

  @Prop()
  resultsText: string;

  @Prop()
  resultsAudio: string;

  @Prop()
  resultsSummary: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);

// Indexing for performance
ConsultationSchema.index({ doctorId: 1 });
ConsultationSchema.index({ patientId: 1 });
ConsultationSchema.index({ createdAt: -1 });

//Added by Nadithi



/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  SchemaFactory.createForClass(Consultation);*/