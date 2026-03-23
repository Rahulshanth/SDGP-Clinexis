import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summarization, SummarizationDocument } from './schemas/summarization.schema';
import { Consultation } from '../consultations/schemas/consultation.schema';

@Injectable()
export class SummarizationService {
  private readonly ai: GoogleGenAI;

  constructor(
    @InjectModel(Summarization.name)
    private readonly summarizationModel: Model<SummarizationDocument>,

    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<Consultation>,
  ) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  // POST — generate and save summary
  async summarize(consultationId: string) {
    const consultation = await this.consultationModel.findById(consultationId);
    if (!consultation) throw new NotFoundException('Consultation not found');

    const text = consultation.fullTranscript;
    if (!text || text.trim() === '')
      throw new BadRequestException('Consultation transcript cannot be empty');

    let response: any;
    try {
      response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
Return ONLY valid JSON. No explanation, no markdown.

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
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException(error?.message || 'Gemini request failed');
    }

    const rawText = response.text;
    if (!rawText) throw new InternalServerErrorException('Empty response from AI');

    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsed: {
      patientCondition?: string;
      keySymptoms?: string[];
      diagnosis?: string;
      treatmentPlan?: string;
      medications?: string[];
    };

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new InternalServerErrorException('AI did not return valid JSON');
    }

    const savedSummary = await this.summarizationModel.create({
      consultationId,
      selectedText: text,
      patientCondition: parsed.patientCondition ?? '',
      keySymptoms: parsed.keySymptoms ?? [],
      diagnosis: parsed.diagnosis ?? '',
      treatmentPlan: parsed.treatmentPlan ?? '',
      medications: parsed.medications ?? [],
    });

    return savedSummary;
  }

  // GET — fetch summary by consultationId
  async getSummaryByConsultationId(consultationId: string) {
    const summary = await this.summarizationModel
      .findOne({ consultationId })
      .sort({ createdAt: -1 });
    if (!summary) throw new NotFoundException('No summary found for this consultation');
    return summary;
  }

  // GET — fetch all summaries (history)
  async getAllSummaries() {
    return this.summarizationModel.find().sort({ createdAt: -1 });
  }
}
//edited by rivithi
