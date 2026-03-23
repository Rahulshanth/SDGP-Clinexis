import api from './api';

export interface PharmacyMatch {
  pharmacyId: string;
  pharmacyName: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  matchedMedicines: string[];
  missingMedicines: string[];
  matchCount: number;
}

export interface PharmacyMatchResponse {
  success: boolean;
  totalPharmacies: number;
  data: PharmacyMatch[];
}

export const searchPharmaciesByMedicine = async (medicine: string, location?: string) => {
  const response = await api.get('/api/pharmacy-matching/search', {
    params: { medicine, location },
  });
  return response.data;
};

export const matchPharmaciesWithMedicines = async (medicines: string[]): Promise<PharmacyMatchResponse> => {
  const response = await api.post('/api/pharmacy-matching/match', { medicines });
  return response.data;
};

export const findNearestPharmacies = async (lat: number, lng: number) => {
  const response = await api.get('/api/pharmacy-matching/nearest', {
    params: { lat, lng },
  });
  return response.data;
};
