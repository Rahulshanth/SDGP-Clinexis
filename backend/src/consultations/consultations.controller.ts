import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Controller('consultations')
export class ConsultationsController {
  constructor(
    private readonly consultationsService: ConsultationsService,
  ) {}

  @Post()
  create(@Body() body: CreateConsultationDto) {
    return this.consultationsService.create(body);
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

//Added by Nadithi