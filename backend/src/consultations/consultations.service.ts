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
    // Render/Production: decode from base64
    if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
      //console.log('✅ Google credentials found! Loading from Base64... -RAHUL-');

      const credentials = JSON.parse(
        Buffer.from(
          process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
          'base64',
        ).toString('utf8'),
      );

      this.speechClient = new SpeechClient({ credentials });
    } else {
      //console.log('❌ Google credentials NOT found in .env!');
      // Local: use JSON file path from GOOGLE_APPLICATION_CREDENTIALS
      this.speechClient = new SpeechClient();
    }
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
          sampleRateHertz: 48000, // Did this according to postman

          languageCode: 'en-IN', // Enhanced the voice type
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

    let currentSpeaker = words[0].speakerTag as number;
    let currentSentence = '';

    for (const wordInfo of words) {
      if ((wordInfo.speakerTag as number) !== currentSpeaker) {
        paragraphs.push(currentSentence.trim());
        currentSentence = '';

        currentSpeaker = wordInfo.speakerTag as number;
      }

      currentSentence += (wordInfo.word as string) + ' ';
    }

    if (currentSentence.trim()) {
      paragraphs.push(currentSentence.trim());
    }

    return paragraphs;
  }

  async findById(id: string): Promise<Consultation | null> {
    return this.consultationModel.findById(id).exec();
  }

  async findByDoctorId(doctorId: string): Promise<Consultation[]> {
    return this.consultationModel
      .find({ doctorId: new Types.ObjectId(doctorId) })
      .exec();
  }

  async findByPatientId(patientId: string): Promise<Consultation[]> {
    return this.consultationModel
      .find({ patientId: new Types.ObjectId(patientId) })
      .exec();
  }
}

//  Finish  BY Rahul
