
import { BaseDocument, ID } from './common.types';

export interface TranscriptParagraph {
  speakerTag: number;  // 1 or 2
  text: string;
}

export interface Consultation extends BaseDocument {
  doctorId: ID;
  patientId: ID;
  fullTranscript: string;
  conversationParagraphs: string[];  // raw paragraphs from backend
}

export interface ConsultationDisplay extends Consultation {
  transcript: TranscriptParagraph[];  // built on frontend for UI
}

export interface ConsultationUploadResponse {
  consultationId: ID;
  paragraphs: string[];
}