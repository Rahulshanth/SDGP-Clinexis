export interface CurrentSummaryData {
  _id: string;
  consultationId: string;
  selectedText: string;
  patientCondition: string;
  keySymptoms: string[];
  diagnosis: string;
  treatmentPlan: string;
  medications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SummaryHistoryItem {
  _id: string;
  consultationId: string;
  patientCondition: string;
  diagnosis: string;
  createdAt: string;
}

export interface GenerateSummaryPayload {
  consultationId: string;
}