import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { SummarizationService } from './summarization.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('consultations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SummarizationController {
  constructor(
    private readonly summarizationService: SummarizationService,
  ) {}

  // POST /consultations/:id/summarize — generate new summary
  @Post(':id/summarize')
  @Roles(UserRole.DOCTOR)
  async summarize(@Param('id') consultationId: string) {
    return this.summarizationService.summarize(consultationId);
  }

  // GET /consultations/summaries/history — get all summaries
  // ⚠️ This MUST be above :id/summary — otherwise NestJS reads
  // "summaries" as an :id param!
  @Get('summaries/history')
  @Roles(UserRole.DOCTOR)
  async getAllSummaries() {
    return this.summarizationService.getAllSummaries();
  }

  // GET /consultations/:id/summary — get summary for one consultation
  @Get(':id/summary')
  @Roles(UserRole.DOCTOR)
  async getSummary(@Param('id') consultationId: string) {
    return this.summarizationService.getSummaryByConsultationId(consultationId);
  }
}