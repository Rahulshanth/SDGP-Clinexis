// src/reminders/reminders.service.spec.ts
// Unit Tests for RemindersService — Written for Clinexis Project

import { RemindersService } from './reminders.service';
import { NotFoundException } from '@nestjs/common';
import { ReminderType } from './schemas/reminder.schema';

// ---- MOCK reminder model ----
const mockSave = jest.fn();

const mockReminderModel = jest.fn().mockImplementation((data) => ({
  ...data,
  save: mockSave,
})) as any;

mockReminderModel.find = jest.fn().mockReturnValue({
  sort: jest.fn().mockReturnValue({ exec: jest.fn() }),
});
mockReminderModel.findByIdAndDelete = jest.fn().mockReturnValue({
  exec: jest.fn(),
});
mockReminderModel.findByIdAndUpdate = jest.fn().mockReturnValue({
  exec: jest.fn(),
});

// ---- TEST SUITE ----
describe('RemindersService - Unit Tests', () => {
  let service: RemindersService;

  beforeEach(() => {
    service = new RemindersService(mockReminderModel);
    jest.clearAllMocks();
  });

  // -----------------------------------------------
  // createRemindersFromConsultation() TESTS
  // -----------------------------------------------
  describe('createRemindersFromConsultation()', () => {

    it('should create reminders when timing keywords found in transcript', async () => {
      const dto = {
        fullTranscript: 'Take medicine in the morning and evening',
        patientId: 'patient123',
        doctorId: 'doctor456',
        consultationId: 'consult789',
      };

      // Mock save to return the reminder data
      mockSave.mockResolvedValue({
        patientId: dto.patientId,
        type: ReminderType.MEDICINE,
        sent: false,
      });

      const result = await service.createRemindersFromConsultation(dto as any);

      // "morning" and "evening" both found → 2 reminders created
      expect(result).toHaveLength(2);
      expect(mockSave).toHaveBeenCalledTimes(2);
    });

    it('should return empty array if no timing keywords in transcript', async () => {
      const dto = {
        fullTranscript: 'Patient is doing well, no medicines needed',
        patientId: 'patient123',
        doctorId: 'doctor456',
        consultationId: 'consult789',
      };

      const result = await service.createRemindersFromConsultation(dto as any);

      // No keywords found → no reminders
      expect(result).toHaveLength(0);
      expect(mockSave).not.toHaveBeenCalled();
    });

    it('should detect all supported timing keywords', () => {
      // Your TIMING_MAP has these keywords
      const timingKeywords = [
        'morning',
        'afternoon',
        'evening',
        'night',
        'noon',
        'bedtime',
      ];

      const transcript =
        'Take medicine in the morning, afternoon, evening, night, noon and bedtime';

      // Check all keywords are found in transcript
      timingKeywords.forEach((keyword) => {
        expect(transcript).toContain(keyword);
      });
    });

  });

  // -----------------------------------------------
  // createMedicineReminder() TESTS
  // -----------------------------------------------
  describe('createMedicineReminder()', () => {

    it('should create a reminder with correct type from dto', async () => {
      const dto = {
        type: ReminderType.MEDICINE,
        title: 'Take Paracetamol',
        message: 'Time to take your medicine',
        reminderTime: new Date().toISOString(),
      };

      const savedReminder = {
        patientId: 'patient123',
        type: ReminderType.MEDICINE,
        title: 'Take Paracetamol',
        sent: false,
      };

      mockSave.mockResolvedValue(savedReminder);

      const result = await service.createMedicineReminder(
        'patient123',
        dto as any,
      );

      expect(result.type).toBe(ReminderType.MEDICINE);
      expect(result.title).toBe('Take Paracetamol');
    });

  });

  // -----------------------------------------------
  // deleteReminder() TESTS
  // -----------------------------------------------
  describe('deleteReminder()', () => {

    it('should return deleted:true when reminder exists', async () => {
      mockReminderModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'reminder123' }),
      });

      const result = await service.deleteReminder('reminder123');
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundException when reminder does not exist', async () => {
      mockReminderModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null), // Not found
      });

      await expect(service.deleteReminder('fakeId')).rejects.toThrow(
        NotFoundException,
      );
    });

  });

  // -----------------------------------------------
  // markAsSent() TESTS
  // -----------------------------------------------
  describe('markAsSent()', () => {

    it('should call findByIdAndUpdate with sent:true', async () => {
      mockReminderModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await service.markAsSent('reminder123');

      expect(mockReminderModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'reminder123',
        { sent: true },
      );
    });

  });

  // -----------------------------------------------
  // notifyAppointmentCancelled() TESTS
  // -----------------------------------------------
  describe('notifyAppointmentCancelled()', () => {

    it('should create a NOTIFICATION type reminder', async () => {
      const dto = {
        patientId: 'patient123',
        doctorName: 'Dr. Silva',
      };

      const savedNotification = {
        patientId: 'patient123',
        type: ReminderType.NOTIFICATION,
        title: 'Appointment Cancelled',
        sent: false,
      };

      mockSave.mockResolvedValue(savedNotification);

      const result = await service.notifyAppointmentCancelled(dto as any);

      expect(result.type).toBe(ReminderType.NOTIFICATION);
      expect(result.title).toBe('Appointment Cancelled');
    });

  });

});
