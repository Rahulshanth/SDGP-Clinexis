import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NlpService {

  async extractMedicine(text: string) {

    const prompt = `
Extract only medicine names from the following prescription text.
Return strictly a JSON array of strings.

Text:
${text}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    let result =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // remove markdown formatting if AI adds it
    result = result.replace(/```json|```/g, '').trim();

    let medicines = [];

    try {
      medicines = JSON.parse(result);
    } catch {
      medicines = [];
    }

    return {
      medicines
    };
  }
}
