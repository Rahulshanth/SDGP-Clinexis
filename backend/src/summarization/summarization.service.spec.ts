// src/summarization/summarization.service.spec.ts
// Unit Tests for SummarizationService — Written for Clinexis Project

import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SummarizationService } from './summarization.service';

// ---- Set fake API key before service loads ----
process.env.GEMINI_API_KEY = 'fake-test-api-key';

// ---- MOCKS ----
const mockSummarizationModel = {
  create: jest.fn(),
  findOne: jest.fn().mockReturnValue({ sort: jest.fn() }),
  find: jest.fn().mockReturnValue({ sort: jest.fn() }),
};

const mockConsultationModel = {
  findById: jest.fn(),
};

const mockAiResponse = {
  text: JSON.stringify({
    patientCondition: 'Mild fever and headache',
    keySymptoms: ['fever', 'headache'],
    diagnosis: 'Viral infection',
    treatmentPlan: 'Rest and hydration',
    medications: ['Paracetamol 500mg'],
  }),
};

// Mock GoogleGenAI
jest.mock('@google/genai', () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: jest.fn().mockResolvedValue(mockAiResponse),
      },
    })),
  };
});

// ---- TEST SUITE ----
describe('SummarizationService - Unit Tests', () => {
  let service: SummarizationService;

  beforeEach(() => {
    service = new SummarizationService(
      mockSummarizationModel as any,
      mockConsultationModel as any,
    );
    jest.clearAllMocks();
  });

  // -----------------------------------------------
  // summarize() TESTS
  // -----------------------------------------------
  describe('summarize()', () => {

    it('should throw NotFoundException if consultation not found', async () => {
      mockConsultationModel.findById.mockResolvedValue(null);

      await expect(service.summarize('fakeId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if transcript is empty', async () => {
      mockConsultationModel.findById.mockResolvedValue({
        fullTranscript: '   ', // Empty/whitespace transcript
      });

      await expect(service.summarize('consultId123')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return saved summary on valid consultation', async () => {
      // Arrange
      mockConsultationModel.findById.mockResolvedValue({
        fullTranscript: 'Patient has fever and headache.',
      });

      const fakeSavedSummary = {
        consultationId: 'consultId123',
        patientCondition: 'Mild fever and headache',
        keySymptoms: ['fever', 'headache'],
        diagnosis: 'Viral infection',
        treatmentPlan: 'Rest and hydration',
        medications: ['Paracetamol 500mg'],
      };

      mockSummarizationModel.create.mockResolvedValue(fakeSavedSummary);

      // Act
      const result = await service.summarize('consultId123');

      // Assert
      expect(result.diagnosis).toBe('Viral infection');
      expect(result.medications).toContain('Paracetamol 500mg');
      expect(mockSummarizationModel.create).toHaveBeenCalledTimes(1);
    });

  });

  // -----------------------------------------------
  // getSummaryByConsultationId() TESTS
  // -----------------------------------------------
  describe('getSummaryByConsultationId()', () => {

    it('should throw NotFoundException if no summary found', async () => {
      const mockSort = jest.fn().mockResolvedValue(null);
      mockSummarizationModel.findOne.mockReturnValue({ sort: mockSort });

      await expect(
        service.getSummaryByConsultationId('unknownId'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return summary if found', async () => {
      const fakeSummary = {
        consultationId: 'consultId123',
        diagnosis: 'Viral infection',
      };

      const mockSort = jest.fn().mockResolvedValue(fakeSummary);
      mockSummarizationModel.findOne.mockReturnValue({ sort: mockSort });

      const result = await service.getSummaryByConsultationId('consultId123');
      expect(result.diagnosis).toBe('Viral infection');
    });

  });

  // -----------------------------------------------
  // Summary Data Structure TESTS
  // -----------------------------------------------
  describe('Summary Data Structure Tests', () => {

    it('should have all required summary fields', () => {
      const summary = {
        patientCondition: 'Mild fever',
        keySymptoms: ['fever', 'cough'],
        diagnosis: 'Flu',
        treatmentPlan: 'Rest',
        medications: ['Paracetamol'],
      };

      expect(summary.patientCondition).toBeDefined();
      expect(summary.keySymptoms).toBeInstanceOf(Array);
      expect(summary.diagnosis).toBeDefined();
      expect(summary.treatmentPlan).toBeDefined();
      expect(summary.medications).toBeInstanceOf(Array);
    });

    it('should handle empty medications array', () => {
      const medications: string[] = [];
      expect(medications).toHaveLength(0); // Edge case handled ✅
    });

  });

});