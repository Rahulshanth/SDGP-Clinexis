import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultation, ConsultationSchema } from './consultations.schema';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Consultation.name,
        schema: ConsultationSchema,
      },
    ]),
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  exports: [ConsultationsService], // optional but recommended
})
export class ConsultationsModule {}