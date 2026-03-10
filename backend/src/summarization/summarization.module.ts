import { Module } from '@nestjs/common';
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
