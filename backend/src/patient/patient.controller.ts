import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { PatientService } from './patient.service';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get('records')
  @Roles(UserRole.PATIENT)
  getPatientRecords() {
    return { message: 'Patient records fetched successfully' };
  }

  // NEW ENDPOINT — patient searches doctors by specialization
  @Get('doctors/search')
  @Roles(UserRole.PATIENT)
  searchDoctors(@Query('specialization') specialization: string) {
    return this.patientService.searchDoctors(specialization);
  }

  // ADD this new endpoint below existing searchDoctors
@Get('doctors/search-by-name')
@Roles(UserRole.PATIENT)
searchDoctorsByName(@Query('name') name: string) {
  return this.patientService.searchDoctorsByName(name);
}

}