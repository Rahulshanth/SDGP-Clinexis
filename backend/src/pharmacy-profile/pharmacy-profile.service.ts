// Import NestJS decorators and exception handling
import { Injectable, NotFoundException } from '@nestjs/common';

// Import Mongoose model injection
import { InjectModel } from '@nestjs/mongoose';

// Import mongoose Model type
import { Model } from 'mongoose';

// Import PharmacyProfile schema and document type
import { PharmacyProfile, PharmacyProfileDocument } from './schemas/pharmacy-profile.schema';

// Import DTOs used for validation
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

// Mark this class as a NestJS service
@Injectable()
export class PharmacyProfileService {

  // Inject PharmacyProfile MongoDB model
  constructor(
    @InjectModel(PharmacyProfile.name)
    private pharmacyModel: Model<PharmacyProfileDocument>,
  ) {}

  // Create a new pharmacy profile
  async create(createDto: CreatePharmacyDto) {
    const pharmacy = new this.pharmacyModel(createDto);
    return pharmacy.save(); // Save to MongoDB
  }

  // Get all pharmacy profiles
  async findAll() {
    return this.pharmacyModel.find().exec();
  }

  // Get a single pharmacy profile by ID
  async findOne(id: string) {
    const pharmacy = await this.pharmacyModel.findById(id).exec();

    // If pharmacy does not exist, throw error
    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found');
    }

    return pharmacy;
  }

  // Update pharmacy profile
  async update(id: string, updateDto: UpdatePharmacyDto) {

    const updated = await this.pharmacyModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true }, // return updated document
    );

    // If pharmacy not found
    if (!updated) {
      throw new NotFoundException('Pharmacy not found');
    }

    return updated;
  }

  // Delete pharmacy profile
  async remove(id: string) {

    const deleted = await this.pharmacyModel.findByIdAndDelete(id);

    // If pharmacy not found
    if (!deleted) {
      throw new NotFoundException('Pharmacy not found');
    }

    return deleted;
  }
}