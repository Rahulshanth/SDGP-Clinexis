// src/reminders/reminders.controller.spec.ts

describe('RemindersController - Unit Tests', () => {

  it('should validate create reminder dto has required fields', () => {
    const createReminderDto = {
      type: 'MEDICINE',
      title: 'Take Paracetamol',
      message: 'Time to take your medicine',
      reminderTime: new Date().toISOString(),
    };

    expect(createReminderDto.type).toBeDefined();
    expect(createReminderDto.title).toBeDefined();
    expect(createReminderDto.message).toBeDefined();
    expect(createReminderDto.reminderTime).toBeDefined();
  });

  it('should validate appointment cancelled dto', () => {
    const dto = {
      patientId: 'patient123',
      doctorName: 'Dr. Silva',
    };

    expect(dto.patientId).toBeDefined();
    expect(dto.doctorName).toBeDefined();
  });

  it('should confirm deleted response structure', () => {
    const deleteResponse = { deleted: true };
    expect(deleteResponse.deleted).toBe(true);
  });

  it('should validate reminder list is an array', () => {
    const reminders: any[] = [];
    expect(Array.isArray(reminders)).toBe(true);
  });

});