import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConsultationDocument = HydratedDocument<Consultation>;

@Schema({ timestamps: true })
export class Consultation {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patientId: Types.ObjectId;

  // Audio recording file URL / path
  @Prop()
  audio: string;

  // Full transcript as one string
  @Prop({ required: true })
  fullTranscript: string;

  // Transcript split into structured paragraphs
  @Prop({ type: [String], default: [] })
  conversationParagraphs: string[];

  // AI summary
  @Prop()
  summary: string;

  @Prop()
  summaryGeneratedAt: Date;

  @Prop({ default: 1 })
  summaryVersion: number;

  // Consultation processing status
  @Prop({ default: 'pending' })
  status: string;

  // Results section
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

//Added by Nadithi on 25th Feb