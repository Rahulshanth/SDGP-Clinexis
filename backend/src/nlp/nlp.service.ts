import { Injectable } from '@nestjs/common';

@Injectable()
export class NlpService {
  test() {
    return 'NLP service working';
  }
}