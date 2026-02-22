import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';

@Injectable()
export class ConsultationsService {
        private speechClient: SpeechClient;

  constructor() {
    this.speechClient = new SpeechClient();
  }

}

// Yet to Finish 