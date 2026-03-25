/*import { useState } from "react";
import { extractMedicines } from "@/services/nlpApi";

export const useNlp = () => {
  const [medicines, setMedicines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extract = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await extractMedicines(text);
      setMedicines(data.medicines || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract medicines");
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  return { medicines, loading, error, extract };
};*/
