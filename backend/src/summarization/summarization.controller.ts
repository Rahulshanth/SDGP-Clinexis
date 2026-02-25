import { Controller, Post, Body, Param, BadRequestException } from '@nestjs/common';
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
    if (!body.consultationText) {
      throw new BadRequestException('Consultation text is required');
    }

    return this.summarizationService.summarize(
      body.consultationText,
      consultationId,
    );
  }
}
//edit by rivithi