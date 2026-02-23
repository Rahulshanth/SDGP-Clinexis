import { Injectable, BadRequestException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class SummarizationService {

  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async summarize(text: string, consultationId: string) {

    if (!text || text.trim() === '') {
      throw new BadRequestException('Consultation text cannot be empty');
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `
Return ONLY valid JSON.
Do NOT include explanation.
Do NOT include markdown.
Do NOT include text before or after JSON.

Use this exact structure:

{
  "patientCondition": string,
  "keySymptoms": string[],
  "diagnosis": string,
  "treatmentPlan": string,
  "medications": string[]
}

Consultation Text:
${text}
      `,
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini');
    }

    // Remove possible markdown formatting
    const cleaned = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(cleaned);
    } catch (error) {
      console.error('Invalid JSON from Gemini:', cleaned);
      throw new Error('AI did not return valid JSON format');
    }

    return {
      consultationId,
      patientCondition: parsed.patientCondition || '',
      keySymptoms: parsed.keySymptoms || [],
      diagnosis: parsed.diagnosis || '',
      treatmentPlan: parsed.treatmentPlan || '',
      medications: parsed.medications || [],
      generatedAt: new Date(),
    };
  }
}
   
//edit by rivithi