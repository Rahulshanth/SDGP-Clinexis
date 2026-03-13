import { Controller, Post, Body } from '@nestjs/common';
import { NlpService } from './nlp.service';

@Controller('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) {}

  @Post('extract')
  async extract(@Body('text') text: string) {
    return this.nlpService.extractMedicine(text);
  }
}
