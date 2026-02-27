import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PharmacyMatchingService } from './pharmacy-matching.service';

@Controller('api/pharmacy-matching')
export class PharmacyMatchingController {
  constructor(private readonly pharmacyMatchingService: PharmacyMatchingService) {}

  @Get('search')
  searchPharmacies(@Query('medicine') medicine: string, @Query('location') location?: string) {
    return this.pharmacyMatchingService.searchPharmacies(medicine, location);
  }

  @Get('nearest')
  findNearestPharmacies(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.pharmacyMatchingService.findNearest(lat, lng);
  }

  @Post('match')
  matchPharmacy(@Body() matchDto: any) {
    return this.pharmacyMatchingService.matchPharmacy(matchDto);
  }
}