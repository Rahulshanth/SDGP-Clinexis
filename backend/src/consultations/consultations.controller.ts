import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsultationsService } from './consultations.service';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    //const paragraphs =
      //await this.consultationsService.processAudio(file.buffer);

    //return { paragraphs };  <-- After implement the whole logic inside consultations.service.ts , these comments wil be undone.
  }
}

//Done by Rahul on 20 th Feb   
// git checkout feature/voice-to-text