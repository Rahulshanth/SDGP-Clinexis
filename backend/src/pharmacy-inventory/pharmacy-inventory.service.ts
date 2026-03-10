// Import Injectable decorator to create a service
import { Injectable } from '@nestjs/common';

// Import mongoose tools to interact with MongoDB
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import Medicine schema and document type
import { Medicine, MedicineDocument } from './schemas/medicine.schema';

@Injectable()
export class PharmacyInventoryService {

  // Inject Medicine model so we can perform database operations
  constructor(
    @InjectModel(Medicine.name)
    private medicineModel: Model<MedicineDocument>,
  ) {}

  // Add a new medicine to pharmacy inventory
  async addMedicine(data: any) {

    // Create new medicine document
    const medicine = new this.medicineModel(data);

    // Save medicine in MongoDB
    return medicine.save();
  }

  // Get all medicines belonging to a pharmacy
  async getMedicines(pharmacyId: string) {

    // Find medicines where pharmacyId matches
    return this.medicineModel.find({ pharmacyId });
  }

  // Update stock quantity of a medicine
  async updateStock(id: string, quantity: number) {

    // Find medicine by ID and update quantity
    return this.medicineModel.findByIdAndUpdate(
      id,
      { quantity }, // new quantity value
      { new: true }, // return updated document
    );
  }
}