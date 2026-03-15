export interface TranscriptParagraph {
  speakerTag: number;
  text: string;
} // Rahul

export interface Consultation {
  _id: string;
  doctorId: string;
  patientId: string;
  fullTranscript: string;
  transcript: TranscriptParagraph[];
  conversationParagraphs: string[];
  createdAt: string;
} // Rahul