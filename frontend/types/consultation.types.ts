export interface TranscriptParagraph {
  speakerTag: number;
  text: string;
} // Rahul

export interface Consultation {
  _id: string;
  doctorId: string;
  patientId: string;
  transcript: TranscriptParagraph[];
  createdAt: string;
} // Rahul