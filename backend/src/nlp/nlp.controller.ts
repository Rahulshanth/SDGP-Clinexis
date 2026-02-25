import { Controller, Get } from '@nestjs/common';

@Controller('nlp')
export class NlpController {
  @Get()
  test() {
    return 'NLP module working';
  }
}