import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  @Get('records')
  @Roles(UserRole.PATIENT)
  getPatientRecords() {
    return {
      message: 'Patient records fetched successfully',
    };
  }
}
