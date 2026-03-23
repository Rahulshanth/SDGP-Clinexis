import api from "./api";
import { Doctor } from "../store/doctorSlice";

// ── Rahul's original function — unchanged ─────────────────────────────────────
export const searchDoctorsBySpecialization = async (
  specialization: string,
): Promise<Doctor[]> => {
  const response = await api.get(
    `/patient/doctors/search?specialization=${encodeURIComponent(specialization)}`,
  );
  return response.data;
};

// ── Vidu — get logged in user profile ────────────────────────────────────────
export const getMyProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// ── Vidu — update logged in user profile ─────────────────────────────────────
export const updateMyProfile = async (data: {
  name?: string;
  specialization?: string;
  hospitalName?: string;
  phoneNumber?: string;
  clinicLocation?: string;
  profilePhoto?: string;
}) => {
  const response = await api.patch("/users/me", data);
  return response.data;
};

// ── Vidu — get any doctor by ID (patient views doctor profile) ────────────────
export const getDoctorById = async (id: string): Promise<Doctor> => {
  const response = await api.get(`/users/${id}`);
  return response.data;};

// ── Search doctors by name — for VoiceRecorder screen ────────────────────────
export const searchDoctorsByName = async (name: string): Promise<Doctor[]> => {
  const response = await api.get(
    `/patient/doctors/search-by-name?name=${encodeURIComponent(name)}`,
  );
  return response.data;
};
  

