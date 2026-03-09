import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorController {
  @Get('test')
  @Roles(UserRole.DOCTOR)
  testDoctorAccess() {
    return {
      message: 'Doctor access granted',
    };
  }

  @Get('consultations')
  @Roles(UserRole.DOCTOR)
  getConsultations() {
    return {
      message: 'Doctor consultations fetched successfully',
    };
  }
}
