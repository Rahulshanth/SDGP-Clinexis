export type SpeakerRole = "doctor" | "patient";

export interface TranscriptLine {
  id: string;
  speaker: SpeakerRole;
  text: string;
  createdAt: string;
}

export interface CurrentSummaryData {
  consultationId: string;
  doctorName: string;
  patientName: string;
  date: string;
  transcript: TranscriptLine[];
  summary: string;
  updatedAt?: string;
}

export interface SummaryHistoryItem {
  id: string;
  consultationId: string;
  doctorName: string;
  patientName: string;
  date: string;
  summary: string;
}

export interface GenerateSummaryPayload {
  consultationId: string;
  selectedTranscriptIds?: string[];
}

//edit by Rivithi