import { Injectable } from '@nestjs/common';

@Injectable()
export class NlpService {

  private medicineList = [
    'paracetamol',
    'ibuprofen',
    'amoxicillin',
    'aspirin',
    'metformin'
  ];

  detectMedicines(text: string) {
    const lowerText = text.toLowerCase();

    return this.medicineList
      .filter(medicine => lowerText.includes(medicine))
      .map(medicine => ({
        name: medicine,
        confidence: 0.9
      }));
  }
}