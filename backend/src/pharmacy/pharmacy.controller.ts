// Import NestJS decorators
import { Controller, Get, Post, Body } from '@nestjs/common';

// Import pharmacy service
import { PharmacyService } from './pharmacy.service';

// Base route for this controller
@Controller('api/pharmacy')
export class PharmacyController {

  // Inject PharmacyService
  constructor(private readonly pharmacyService: PharmacyService) {}

  // Endpoint to check if pharmacy service is running
  @Get('status')
  getStatus() {
    return this.pharmacyService.getStatus();
  }
}
