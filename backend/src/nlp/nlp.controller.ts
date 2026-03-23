import { Controller, Post, Body } from '@nestjs/common';
import { NlpService } from './nlp.service';

// Controller responsible for handling NLP-related API requests
// Base route: /nlp
@Controller('nlp')
export class NlpController {

  // Injecting NlpService to use its business logic
  constructor(private readonly nlpService: NlpService) {}

  // POST endpoint to extract medicine names from given text
  // Route: POST /nlp/extract
  @Post('extract')
  async extract(@Body('text') text: string) {

    // Calls the service method to process the input text
    // and extract medicine names using NLP logic
    return this.nlpService.extractMedicine(text);
  }
}