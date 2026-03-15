import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummarizationDocument = Summarization & Document;

@Schema({ timestamps: true })
export class Summarization {
  @Prop({ required: true })
  consultationId: string;

  @Prop({ required: true })
  selectedText: string;

  @Prop()
  patientCondition: string;

  @Prop([String])
  keySymptoms: string[];

  @Prop()
  diagnosis: string;

  @Prop()
  treatmentPlan: string;

  @Prop([String])
  medications: string[];
}

export const SummarizationSchema = SchemaFactory.createForClass(Summarization);
