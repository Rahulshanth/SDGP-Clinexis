import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PharmacyProfile, PharmacyProfileDocument } from './schemas/pharmacy-profile.schema';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmacyProfileService {
  constructor(
    @InjectModel(PharmacyProfile.name)
    private pharmacyModel: Model<PharmacyProfileDocument>,
  ) {}

  async create(createDto: CreatePharmacyDto) {
    const pharmacy = new this.pharmacyModel(createDto);
    return pharmacy.save();
  }

  async findAll() {
    return this.pharmacyModel.find().exec();
  }

  async findOne(id: string) {
    const pharmacy = await this.pharmacyModel.findById(id).exec();
    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found');
    }
    return pharmacy;
  }

  async update(id: string, updateDto: UpdatePharmacyDto) {
    const updated = await this.pharmacyModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Pharmacy not found');
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.pharmacyModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Pharmacy not found');
    }

    return deleted;
  }
}