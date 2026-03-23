import api from "./api";
import { Consultation, ConsultationUploadResponse } from "../types/consultation.types";

export const uploadAudio = async (formData: FormData): Promise<ConsultationUploadResponse> => {
  const response = await api.post("/consultations/upload-audio", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getConsultationById = async (id: string): Promise<Consultation> => {
  const response = await api.get(`/consultations/${id}`);
  return response.data;
};

export const getConsultations = async (): Promise<Consultation[]> => {
  const response = await api.get("/consultations");
  return response.data;
};