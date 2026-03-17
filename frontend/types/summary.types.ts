export interface SummaryItem {
  _id: string;
  consultationId: string;
  patientName: string;
  doctorName: string;
  date: string;
  summaryText: string;
  extractedMedicines?: string[];
}

export interface ConsultationRecord {
  _id: string;
  doctorName: string;
  patientName: string;
  date: string;
  conversation: string;
}

//edit by rivithi