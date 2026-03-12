import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyService {
  getStatus() {
    return {
      status: 'active',
      message: 'Pharmacy service is running',
    };
  }
}
