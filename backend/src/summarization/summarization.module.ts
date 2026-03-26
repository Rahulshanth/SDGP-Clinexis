/*import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarizationController } from './summarization.controller';
import { SummarizationService } from './summarization.service';
import {
  Summarization,
  SummarizationSchema,
} from './schemas/summarization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Summarization.name, schema: SummarizationSchema },
    ]),
  ],
  controllers: [SummarizationController],
  providers: [SummarizationService],
})
export class SummarizationModule {}
//edit by rivithi
*/
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarizationController } from './summarization.controller';
import { SummarizationService } from './summarization.service';
import { Summarization, SummarizationSchema } from './schemas/summarization.schema';
import { Consultation, ConsultationSchema } from '../consultations/schemas/consultation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Summarization.name, schema: SummarizationSchema },
      { name: Consultation.name, schema: ConsultationSchema },
    ]),
  ],
  controllers: [SummarizationController],
  providers: [SummarizationService],
})
export class SummarizationModule {}

//edit by rivithi