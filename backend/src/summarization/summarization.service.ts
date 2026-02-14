import { Injectable } from '@nestjs/common';

@Injectable()
export class SummarizationService {
  async summarize(consultationId: string, text: string) {
    const summary = text.slice(0, 120);

    return {
      consultationId,
      summary,
      generatedAt: new Date(),
    };
  }
}
