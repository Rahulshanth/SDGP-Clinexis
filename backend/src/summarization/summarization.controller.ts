/*import { Controller, Post, Body, Param } from '@nestjs/common';
import { SummarizationService } from './summarization.service';
import { SummarizeDto } from './dto/summarize.dto';

@Controller('consultations')
export class SummarizationController {
  constructor(
    private readonly summarizationService: SummarizationService,
  ) {}

  @Post(':id/summarize')
  async summarize(
    @Param('id') consultationId: string,
    @Body() body: SummarizeDto,
  ) {
    return this.summarizationService.summarize(
      body.consultationText,
      consultationId,
    );
  }
}
//edit by rivithi
*/

import { Controller, Post, Param } from '@nestjs/common';
import { SummarizationService } from './summarization.service';

@Controller('consultations')
export class SummarizationController {
  constructor(
    private readonly summarizationService: SummarizationService,
  ) {}

  @Post(':id/summarize')
  async summarize(@Param('id') consultationId: string) {
    return this.summarizationService.summarize(consultationId);
  }
}