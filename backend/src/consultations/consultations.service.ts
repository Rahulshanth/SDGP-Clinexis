import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Consultation,
  ConsultationDocument,
} from './consultations.schema';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<ConsultationDocument>,
  ) {}

  async create(data: Partial<Consultation>) {
    const consultation = new this.consultationModel(data);
    return consultation.save();
  }

  async findAll() {
    return this.consultationModel.find().exec();
  }

  async findOne(id: string) {
    return this.consultationModel.findById(id).exec();
  }

  async remove(id: string) {
    return this.consultationModel.findByIdAndDelete(id).exec();
  }
}
