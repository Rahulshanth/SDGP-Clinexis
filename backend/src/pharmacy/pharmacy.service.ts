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
  private pharmacies = [
    {
      id: 1,
      name: 'HealthPlus',
      medicineName: 'Paracetamol',
      quantity: 20,
      price: 100,
    },
    {
      id: 2,
      name: 'CityCare',
      medicineName: 'Ibuprofen',
      quantity: 10,
      price: 150,
    },
    {
      id: 3,
      name: 'MediHub',
      medicineName: 'Paracetamol',
      quantity: 5,
      price: 90,
    },
  ];

  searchByMedicine(medicine: string) {
    if (!medicine) {
      return { success: false, message: 'Medicine name required' };
    }

    const results = this.pharmacies
      .filter((p) =>
        p.medicineName.toLowerCase().includes(medicine.toLowerCase()),
      )
      .filter((p) => p.quantity > 0)
      .sort((a, b) => a.price - b.price);

  // Inject the Pharmacy MongoDB model
  constructor(
    @InjectModel(Pharmacy.name)
    private pharmacyModel: Model<PharmacyDocument>,
  ) {}

  // Simple status check for testing the service
  getStatus() {
    return {
      status: 'active',
      message: 'Pharmacy service is running'
    };
  }
}
