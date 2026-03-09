import { useState } from "react";
import { extractMedicines } from "../api/nlpApi";

export const useNlp = () => {

  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<string[]>([]);
  const [error, setError] = useState("");

  const extract = async (text: string) => {
    try {

      setLoading(true);
      setError("");

      const res = await extractMedicines(text);

      const cleaned = res.aiResponse
        .replace(/```json|```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      setMedicines(parsed);

    } catch (err) {
      setError("Failed to extract medicines");
    } finally {
      setLoading(false);
    }
  };

  return { medicines, loading, error, extract };
};