import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Req,
  ForbiddenException,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsultationsService } from './consultations.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/enums/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Roles(UserRole.DOCTOR , UserRole.PATIENT)
  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body('doctorId') doctorId: string,    // Updated according schemas by rahul
    @Body('patientId') patientId: string,  // Updated according schemas by rahul
  ) {
    if (!file) {
      throw new BadRequestException('Audio file is required');
    }

    if (!doctorId || !patientId) {
      throw new BadRequestException(
        'doctorId and patientId are required', // Updated according schemas by rahul
      );
    }

    const paragraphs = await this.consultationsService.processAndSaveAudio( // Updated according schemas by rahul
      file.buffer,
      doctorId,
      patientId,
    );

    return { paragraphs };  
  }

  @Roles(UserRole.DOCTOR , UserRole.PATIENT)
  @Get(':id')
  async getConsultationById(@Param('id') id: string, @Req() req) {
    const user = req.user;

    const consultation = await this.consultationsService.findById(id);

    if (!consultation) {
      throw new ForbiddenException('Consultation not found');
    }

    // Doctor can only see their own
    if (
      user.role === 'doctor' &&
      consultation.doctorId.toString() !== user.userId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Patient can only see their own
    if (
      user.role === 'patient' &&
      consultation.patientId.toString() !== user.userId
    ) {
      throw new ForbiddenException('Access denied');
    }

    if (user.role === 'pharmacy') {
      throw new ForbiddenException('Access denied');
    }

    return {
      conversationParagraphs: consultation.conversationParagraphs,
    };
  }
}

//Finish by Rahul on 25 th Feb   
// git checkout feature/voice-to-text