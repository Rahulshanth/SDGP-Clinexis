// Import NestJS decorators to create API routes
import { Controller, Get, Post, Body, Query } from '@nestjs/common';

// Import the pharmacy matching service
import { PharmacyMatchingService } from './pharmacy-matching.service';

// Base route for pharmacy matching APIs
@Controller('api/pharmacy-matching')
export class PharmacyMatchingController {
  constructor(
    private readonly pharmacyMatchingService: PharmacyMatchingService,
  ) {}

  // GET /api/pharmacy-matching/search?medicine=Paracetamol
  // Search pharmacies that contain a specific medicine
  @Get('search')
  searchPharmacies(
    @Query('medicine') medicine: string,
    @Query('location') location?: string,
  ) {
    return this.pharmacyMatchingService.searchPharmacies(medicine, location);
  }

  // GET /api/pharmacy-matching/nearest?lat=6.92&lng=80.78
  // Find pharmacies near a given location
  @Get('nearest')
  findNearestPharmacies(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    return this.pharmacyMatchingService.findNearest(lat, lng);
  }

  // POST /api/pharmacy-matching/match
  // Match pharmacies based on multiple medicines
  @Post('match')
  matchPharmacy(@Body() body: any) {

    // Example request body:
    // {
    //   "medicines": ["Paracetamol", "Ibuprofen"]
    // }

    return this.pharmacyMatchingService.matchPharmacies(body.medicines);
  }
}
