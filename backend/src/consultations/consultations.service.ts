import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';
import { protos } from '@google-cloud/speech';

@Injectable()
export class ConsultationsService {
        private speechClient: SpeechClient;

  constructor() {
    this.speechClient = new SpeechClient();
  }

    async processAudio(audioBuffer: Buffer): Promise<string[]> {
  try {
    const audioBytes = audioBuffer.toString('base64');

    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        enableWordTimeOffsets: true,
        diarizationConfig: {
          enableSpeakerDiarization: true,
          minSpeakerCount: 2,
          maxSpeakerCount: 2,
        },
      },
    };

    const [response] = await this.speechClient.recognize(request);

    if (!response.results?.length) {
      return [];
    }

    const words =
      response.results[response.results.length - 1]
        .alternatives?.[0]?.words;

    if (!words || words.length === 0) {
      return [];
    }

    return this.groupBySpeaker(words);
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException(
      'Error processing speech-to-text',
    );
  }
}

  private groupBySpeaker(words: any[]): string[] {
    const paragraphs: string[] = [];

    let currentSpeaker = words[0].speakerTag;
    let currentSentence = '';

    for (const wordInfo of words) {
      if (wordInfo.speakerTag !== currentSpeaker) {
        paragraphs.push(currentSentence.trim());
        currentSentence = '';
        currentSpeaker = wordInfo.speakerTag;
      }

      currentSentence += wordInfo.word + ' ';
    }

    if (currentSentence.trim()) {
      paragraphs.push(currentSentence.trim());
    }

    return paragraphs;
  }
}

// Yet to Finish 