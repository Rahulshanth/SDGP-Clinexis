import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';
import { protos } from '@google-cloud/speech';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Consultation } from './schemas/consultation.schema';

@Injectable()
export class ConsultationsService {
  private speechClient: SpeechClient;

  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {
    this.speechClient = new SpeechClient();
  }

  async processAndSaveAudio(
    audioBuffer: Buffer,
    doctorId: string,
    patientId: string,
  ): Promise<{ consultationId: any; paragraphs: string[] }> {
    // Restrict the return type to reduce errors
    try {
      const audioBytes = audioBuffer.toString('base64');

      const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
        audio: {
          content: audioBytes,
        },
        config: {
          encoding:
            protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding
              .LINEAR16,
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
        //return [];
        throw new Error('No transcription results');
      }

      const words =
        response.results[response.results.length - 1].alternatives?.[0]?.words;

      if (!words || words.length === 0) {
        //return [];
        throw new Error('No words in transcription');
      }

      //  Group by speaker
      const conversationParagraphs = this.groupBySpeaker(words);

      // Join paragraphs for full transcript
      const fullTranscript = conversationParagraphs.join(' ');

      // Save to MongoDB (THIS was missing in your version!)
      const consultation = await this.consultationModel.create({
        doctorId: new Types.ObjectId(doctorId),
        patientId: new Types.ObjectId(patientId),
        fullTranscript,
        conversationParagraphs,
      });

      // Return just the array to match your controller
      return {
        consultationId: consultation._id,
        paragraphs: conversationParagraphs,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error processing speech-to-text');
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

//  Finish  BY Rahul
