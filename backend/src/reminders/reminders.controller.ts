// ALL ADD by VIDU* code updated on 2026/03/03

import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  // 🔹 Create Medicine Reminder (Patient)
  @Post('medicine')
  createMedicineReminder(
    @Body()
    body: {
      patientId: string;
      title: string;
      message: string;
      reminderTime: string;
    },
  ) {
    return this.remindersService.createMedicineReminder(body);
  }

  // 🔹 Notify Appointment Cancelled (Doctor → Patient)
  @Post('appointment-cancelled')
  appointmentCancelled(
    @Body() body: { patientId: string; doctorName: string },
  ) {
    return this.remindersService.notifyAppointmentCancelled(body);
  }

  // 🔹 Get Reminders For Specific User
  @Get(':userId')
  getUserReminders(@Param('userId') userId: string) {
    return this.remindersService.getUserReminders(userId);
  }

  // 🔹 Delete Reminder
  @Delete(':id')
  deleteReminder(@Param('id') id: string) {
    return this.remindersService.deleteReminder(id);
  }

  // 🔹 Get Pending Reminders (For Scheduler)
  @Get('pending/all')
  getPending() {
    return this.remindersService.getPendingReminders();
  }
}
