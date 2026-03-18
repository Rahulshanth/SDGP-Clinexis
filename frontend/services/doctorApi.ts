import api from "./api";
import { Doctor } from "../store/doctorSlice";

export const searchDoctorsBySpecialization = async (
  specialization: string
): Promise<Doctor[]> => {
  const response = await api.get(
    `/patient/doctors/search?specialization=${encodeURIComponent(specialization)}`
  );
  return response.data;
};