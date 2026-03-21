import api from "./api";
import { CurrentSummaryData, GenerateSummaryPayload, SummaryHistoryItem } from "../types";

const summaryApi = {
  // GET existing summary for a consultation
  getCurrentSummary: async (consultationId: string): Promise<CurrentSummaryData> => {
    const response = await api.get(`/consultations/${consultationId}/summary`);
    return response.data;
  },

  // POST generate new summary
  generateSummary: async ({ consultationId }: GenerateSummaryPayload): Promise<CurrentSummaryData> => {
    const response = await api.post(`/consultations/${consultationId}/summarize`);
    return response.data;
  },

  // GET all summaries history
  getSummaryHistory: async (): Promise<SummaryHistoryItem[]> => {
    const response = await api.get(`/consultations/summaries/history`);
    return response.data;
  },
};

export default summaryApi;