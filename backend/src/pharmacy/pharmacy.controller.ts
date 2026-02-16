import { Controller, Get, Query } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller('api/pharmacies')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('search')
  search(@Query('medicine') medicine: string) {
    return this.pharmacyService.searchByMedicine(medicine);
  }
}