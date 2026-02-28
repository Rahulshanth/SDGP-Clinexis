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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return {
      aiResponse:
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    };
  }
}