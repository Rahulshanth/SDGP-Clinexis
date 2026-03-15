// Import Injectable so NestJS can use this service
import { Injectable } from '@nestjs/common';

// Import InjectModel to access MongoDB collection
import { InjectModel } from '@nestjs/mongoose';

// Import mongoose Model type
import { Model } from 'mongoose';

// Import Pharmacy schema and document type
import { Pharmacy, PharmacyDocument } from './schemas/pharmacy.schema';

@Injectable()
export class PharmacyService {
  // Inject the Pharmacy MongoDB model
  constructor(
    @InjectModel(Pharmacy.name)
    private pharmacyModel: Model<PharmacyDocument>,
  ) {}

  // Simple status check for testing the service
  getStatus() {
    return {
      status: 'active',
      message: 'Pharmacy service is running',
    };
  }

  // Create a new pharmacy in MongoDB
  async createPharmacy(data: any) {
    return this.pharmacyModel.create(data);
  }

  // Get all pharmacies from database
  async getAllPharmacies() {
    return this.pharmacyModel.find();
  }

  // Find one pharmacy using ID
  async getPharmacyById(id: string) {
    return this.pharmacyModel.findById(id);
  }
}
