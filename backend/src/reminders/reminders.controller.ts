// All by Vidu  Updated on 2026/03/10
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import {
  CreateReminderDto,
  AppointmentCancelledDto,
  CreateRemindersFromConsultationDto,
} from './dto/create-reminder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum'; // ✅ correct path

@Controller('reminders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  // DOCTOR: After consultation saved, create reminders from transcript
  @Post('from-consultation')
  @Roles(UserRole.DOCTOR, UserRole.PATIENT) // ← added PATIENT
  createFromConsultation(@Body() dto: CreateRemindersFromConsultationDto) {
    return this.remindersService.createRemindersFromConsultation(dto);
  }

  // PATIENT: Create manual medicine reminder
  @Post('medicine')
  @Roles(UserRole.PATIENT)
  createMedicineReminder(@Request() req, @Body() dto: CreateReminderDto) {
    const patientId = req.user.userId;
    return this.remindersService.createMedicineReminder(patientId, dto);
  }

  // DOCTOR: Notify patient of cancellation
  @Post('appointment-cancelled')
  @Roles(UserRole.DOCTOR)
  appointmentCancelled(@Body() dto: AppointmentCancelledDto) {
    return this.remindersService.notifyAppointmentCancelled(dto);
  }

  // PATIENT: Get own reminders
  @Get('my')
  @Roles(UserRole.PATIENT)
  getUserReminders(@Request() req) {
    const patientId = req.user.userId;
    return this.remindersService.getUserReminders(patientId);
  }

  // PATIENT: Delete reminder
  @Delete(':id')
  @Roles(UserRole.PATIENT)
  deleteReminder(@Param('id') id: string) {
    return this.remindersService.deleteReminder(id);
  }
}
