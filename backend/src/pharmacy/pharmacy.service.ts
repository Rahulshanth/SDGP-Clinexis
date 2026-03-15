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
  getStatus() {
    return {
      status: 'active',
      message: 'Pharmacy service is running',
    };
  }
}
