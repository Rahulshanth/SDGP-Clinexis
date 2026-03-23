// Import NestJS decorators
import { Controller, Get, Post, Body } from '@nestjs/common';

// Import pharmacy service
import { PharmacyService } from './pharmacy.service';

// Base route for this controller
@Controller('api/pharmacy')
export class PharmacyController {
  // Inject PharmacyService
  constructor(private readonly pharmacyService: PharmacyService) { }

  // Endpoint to check if pharmacy service is running
  @Get('status')
  getStatus() {
    return this.pharmacyService.getStatus();
  }

  // Health check for the pharmacy module
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      module: 'Pharmacy Module',
      submodules: ['pharmacy-profile', 'pharmacy-matching'],
    };
  }

  // Create a new pharmacy in the database
  @Post()
  createPharmacy(@Body() data: any) {
    return this.pharmacyService.createPharmacy(data);
  }

  // Get all pharmacies from the database
  @Get()
  getAllPharmacies() {
    return this.pharmacyService.getAllPharmacies();
  }

}