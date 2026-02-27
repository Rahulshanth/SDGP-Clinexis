import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConsultationsController } from './consultations.controller';
import { ConsultationsService } from './consultations.service';
import { MongooseModule } from '@nestjs/mongoose';  // Updated according schemas by rahul
import {
  Consultation,
  ConsultationSchema,
} from './schemas/consultation.schema'; // Updated according to schemas by rahul


@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
      },
    }),
    MongooseModule.forFeature([
      { name: Consultation.name, schema: ConsultationSchema },
    ]), // Updated according to schemas by rahul
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
})
export class ConsultationsModule {}

// Done by Rahul on 20 th Feb