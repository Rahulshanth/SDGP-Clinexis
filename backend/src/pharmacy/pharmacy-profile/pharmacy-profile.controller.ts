import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PharmacyProfileService } from './pharmacy-profile.service';

@Controller('api/pharmacy-profile')
export class PharmacyProfileController {
  constructor(private readonly pharmacyProfileService: PharmacyProfileService) {}

  @Get()
  findAll() {
    return this.pharmacyProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyProfileService.findOne(id);
  }

  @Post()
  create(@Body() createProfileDto: any) {
    return this.pharmacyProfileService.create(createProfileDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: any) {
    return this.pharmacyProfileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyProfileService.remove(id);
  }
}