import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultationSchema } from './consultations.schema';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Consultation',
        schema: ConsultationSchema,
      },
    ]),
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
})
export class ConsultationsModule {}