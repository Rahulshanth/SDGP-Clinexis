import axios from "axios";

const API = axios.create({
  baseURL: "http://10.31.13.194:5001" // Update with my backend URL,
});

export const extractMedicines = async (text: string) => {
  const response = await API.post("/nlp/extract", { text });
  return response.data;
};