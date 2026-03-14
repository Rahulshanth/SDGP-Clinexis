import { Controller, Get } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller('api/pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('status')
  getStatus() {
    return this.pharmacyService.getStatus();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      module: 'Pharmacy Module',
      submodules: ['pharmacy-profile', 'pharmacy-matching'],
    };
  }
}