// Import NestJS decorators for creating API routes
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

// Import the service that handles pharmacy profile logic
import { PharmacyProfileService } from './pharmacy-profile.service';

// Base route for this controller
@Controller('api/pharmacy-profile')
export class PharmacyProfileController {

  // Inject PharmacyProfileService
  constructor(private readonly pharmacyProfileService: PharmacyProfileService) {}

  // GET /api/pharmacy-profile
  // Retrieve all pharmacy profiles
  @Get()
  findAll() {
    return this.pharmacyProfileService.findAll();
  }

  // GET /api/pharmacy-profile/:id
  // Retrieve a single pharmacy profile by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyProfileService.findOne(id);
  }

  // POST /api/pharmacy-profile
  // Create a new pharmacy profile
  @Post()
  create(@Body() createProfileDto: any) {
    return this.pharmacyProfileService.create(createProfileDto);
  }

  // PUT /api/pharmacy-profile/:id
  // Update an existing pharmacy profile
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: any) {
    return this.pharmacyProfileService.update(id, updateProfileDto);
  }

  // DELETE /api/pharmacy-profile/:id
  // Delete a pharmacy profile
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyProfileService.remove(id);
  }
}