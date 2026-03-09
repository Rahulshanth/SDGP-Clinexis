import { Injectable } from '@nestjs/common';

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

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }
}
