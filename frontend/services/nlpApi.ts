import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
});

export const extractMedicines = async (text: string) => {
  const response = await API.post("/nlp/extract", { text });
  return response.data;
};