import { Controller, Post, Get, Param } from '@nestjs/common';
import { SummarizationService } from './summarization.service';

@Controller('consultations')
export class SummarizationController {
  constructor(private readonly summarizationService: SummarizationService) {}

  // POST /consultations/:id/summarize
  @Post(':id/summarize')
  async summarize(@Param('id') consultationId: string) {
    return this.summarizationService.summarize(consultationId);
  }

  // GET /consultations/:id/summary
  @Get(':id/summary')
  async getSummary(@Param('id') consultationId: string) {
    return this.summarizationService.getSummaryByConsultationId(consultationId);
  }

  // GET /consultations/summaries/history
  @Get('summaries/history')
  async getAllSummaries() {
    return this.summarizationService.getAllSummaries();
  }
}