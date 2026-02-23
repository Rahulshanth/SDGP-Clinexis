import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { Consultation } from './consultations.schema';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  create(@Body() data: Partial<Consultation>) {
    return this.consultationsService.create(data);
  }

  @Get()
  findAll() {
    return this.consultationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationsService.remove(id);
  }
}