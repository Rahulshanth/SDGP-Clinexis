// Import NestJS decorators for creating routes
import { Controller, Get, Post, Body, Query } from '@nestjs/common';

// Import the service that contains the matching logic
import { PharmacyMatchingService } from './pharmacy-matching.service';

// Base route for this controller
@Controller('api/pharmacy-matching')
export class PharmacyMatchingController {

  // Inject PharmacyMatchingService
  constructor(private readonly pharmacyMatchingService: PharmacyMatchingService) {}

  // API to search pharmacies by medicine and optional location
  // Example: GET /api/pharmacy-matching/search?medicine=Paracetamol
  @Get('search')
  searchPharmacies(
    @Query('medicine') medicine: string,
    @Query('location') location?: string
  ) {
    return this.pharmacyMatchingService.searchPharmacies(medicine, location);
  }

  // API to find nearest pharmacies using latitude and longitude
  // Example: GET /api/pharmacy-matching/nearest?lat=6.92&lng=80.77
  @Get('nearest')
  findNearestPharmacies(
    @Query('lat') lat: number,
    @Query('lng') lng: number
  ) {
    return this.pharmacyMatchingService.findNearest(lat, lng);
  }

  // API to match pharmacy using request body
  // Example: POST /api/pharmacy-matching/match
  @Post('match')
  matchPharmacy(@Body() matchDto: any) {
    return this.pharmacyMatchingService.matchPharmacy(matchDto);
  }

}