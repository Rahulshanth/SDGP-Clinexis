import api from "./api";
import {
  CurrentSummaryData,
  GenerateSummaryPayload,
  SummaryHistoryItem,
} from "../types";

const summaryApi = {
  getCurrentSummary: async (
    consultationId: string
  ): Promise<CurrentSummaryData> => {
    const response = await api.get(`/summaries/current/${consultationId}`);
    return response.data;
  },

  generateSummary: async ({
    consultationId,
    selectedTranscriptIds,
  }: GenerateSummaryPayload): Promise<CurrentSummaryData> => {
    const response = await api.post(
      `/consultations/${consultationId}/summarize`,
      {
        selectedTranscriptIds,
      }
    );
    return response.data;
  },

  getSummaryHistory: async (): Promise<SummaryHistoryItem[]> => {
    const response = await api.get(`/summaries/history`);
    return response.data;
  },
};

export default summaryApi;

//edit by rivithi