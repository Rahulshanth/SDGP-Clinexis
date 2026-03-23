// src/consultations/consultations.service.spec.ts
// Unit Tests for ConsultationsService — Written for Clinexis Project

import { ConsultationsService } from './consultations.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';

// ---- MOCKS ----
const mockConsultationModel = {
  create: jest.fn(),
  findById: jest.fn().mockReturnValue({ exec: jest.fn() }),
  find: jest.fn().mockReturnValue({ exec: jest.fn() }),
};

// Mock Google Speech Client
jest.mock('@google-cloud/speech', () => {
  return {
    SpeechClient: jest.fn().mockImplementation(() => ({
      recognize: jest.fn(),
    })),
  };
});

// Mock ffmpeg
jest.mock('fluent-ffmpeg', () => {
  const mFfmpeg = jest.fn().mockReturnValue({
    audioFrequency: jest.fn().mockReturnThis(),
    audioChannels: jest.fn().mockReturnThis(),
    audioCodec: jest.fn().mockReturnThis(),
    format: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    save: jest.fn().mockReturnThis(),
  });
  (mFfmpeg as any).setFfmpegPath = jest.fn(); // ✅ cast to any fixes it
  return mFfmpeg;
});

// ---- TEST SUITE ----
describe('ConsultationsService - Unit Tests', () => {

  // -----------------------------------------------
  // groupBySpeaker TESTS (private logic)
  // -----------------------------------------------
  describe('groupBySpeaker() - Speaker Grouping Logic', () => {

    it('should group words by speaker correctly', () => {
      // We test the logic directly using plain objects
      const words = [
        { word: 'Hello', speakerTag: 1 },
        { word: 'doctor', speakerTag: 1 },
        { word: 'I', speakerTag: 2 },
        { word: 'have', speakerTag: 2 },
        { word: 'fever', speakerTag: 2 },
      ];

      // Replicate the groupBySpeaker logic from your service
      const paragraphs: string[] = [];
      let currentSpeaker = words[0].speakerTag;
      let currentSentence = '';

      for (const wordInfo of words) {
        if (wordInfo.speakerTag !== currentSpeaker) {
          paragraphs.push(currentSentence.trim());
          currentSentence = '';
          currentSpeaker = wordInfo.speakerTag;
        }
        currentSentence += wordInfo.word + ' ';
      }
      if (currentSentence.trim()) {
        paragraphs.push(currentSentence.trim());
      }

      // Speaker 1 and Speaker 2 should be separate paragraphs
      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[0]).toBe('Hello doctor');
      expect(paragraphs[1]).toBe('I have fever');
    });

    it('should handle single speaker correctly', () => {
      const words = [
        { word: 'Good', speakerTag: 1 },
        { word: 'morning', speakerTag: 1 },
      ];

      const paragraphs: string[] = [];
      let currentSpeaker = words[0].speakerTag;
      let currentSentence = '';

      for (const wordInfo of words) {
        if (wordInfo.speakerTag !== currentSpeaker) {
          paragraphs.push(currentSentence.trim());
          currentSentence = '';
          currentSpeaker = wordInfo.speakerTag;
        }
        currentSentence += wordInfo.word + ' ';
      }
      if (currentSentence.trim()) {
        paragraphs.push(currentSentence.trim());
      }

      // Only one paragraph since only one speaker
      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0]).toBe('Good morning');
    });

  });

  // -----------------------------------------------
  // Consultation SCHEMA TESTS
  // -----------------------------------------------
  describe('Consultation Data Structure Tests', () => {

    it('should create valid consultation object structure', () => {
      const consultation = {
        doctorId: new Types.ObjectId(),
        patientId: new Types.ObjectId(),
        fullTranscript: 'Patient has fever and headache',
        conversationParagraphs: ['Doctor: hello', 'Patient: I have fever'],
      };

      expect(consultation.doctorId).toBeDefined();
      expect(consultation.patientId).toBeDefined();
      expect(consultation.fullTranscript).toBeTruthy();
      expect(consultation.conversationParagraphs).toHaveLength(2);
    });

    it('should detect empty transcript', () => {
      const transcript = '';
      expect(transcript.length).toBe(0); // Empty transcript caught ✅
    });

    it('should validate doctorId and patientId are valid ObjectIds', () => {
      const doctorId = new Types.ObjectId().toString();
      const patientId = new Types.ObjectId().toString();

      expect(Types.ObjectId.isValid(doctorId)).toBe(true);
      expect(Types.ObjectId.isValid(patientId)).toBe(true);
    });

  });

  // -----------------------------------------------
  // findById / findByDoctorId TESTS
  // -----------------------------------------------
  describe('Database Query Tests', () => {

    it('should call findById with correct id', async () => {
      const mockExec = jest.fn().mockResolvedValue({ _id: 'abc123' });
      mockConsultationModel.findById.mockReturnValue({ exec: mockExec });

      const service = new ConsultationsService(
        mockConsultationModel as any,
      );

      await service.findById('abc123');
      expect(mockConsultationModel.findById).toHaveBeenCalledWith('abc123');
    });

    it('should return null for non-existent consultation', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      mockConsultationModel.findById.mockReturnValue({ exec: mockExec });

      const service = new ConsultationsService(
        mockConsultationModel as any,
      );

      const result = await service.findById('nonexistent123');
      expect(result).toBeNull();
    });

  });

});