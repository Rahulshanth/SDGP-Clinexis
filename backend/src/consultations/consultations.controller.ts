import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsultationsService } from './consultations.service';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body('doctorId') doctorId: string, // Updated according schemas by rahul
    @Body('patientId') patientId: string, // Updated according schemas by rahul
  ) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    if (!doctorId || !patientId) {
      throw new BadRequestException(
        'doctorId and patientId are required', // Updated according schemas by rahul
      );
    }

    const paragraphs = await this.consultationsService.processAndSaveAudio(
      // Updated according schemas by rahul
      file.buffer,
      doctorId,
      patientId,
    );

    return { paragraphs };
  }
}

//Finish by Rahul on 25 th Feb
// git checkout feature/voice-to-text
