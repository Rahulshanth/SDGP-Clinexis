import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Consultation,
  ConsultationDocument,
} from './consultations.schema';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<ConsultationDocument>,
  ) {}

  async create(data: CreateConsultationDto) {
    const consultation = new this.consultationModel(data);
    return consultation.save();
  }

  async findAll() {
    return this.consultationModel.find().exec();
  }

  async findOne(id: string) {
    const consultation = await this.consultationModel.findById(id).exec();

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return consultation;
  }

  async remove(id: string) {
    const deleted = await this.consultationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deleted) {
      throw new NotFoundException('Consultation not found');
    }

    return deleted;
  }
}

//Added by Nadithi