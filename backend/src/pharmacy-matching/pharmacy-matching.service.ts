import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyMatchingService {
  private pharmacies: any[] = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      location: 'Downtown',
      lat: 6.9271,
      lng: 80.7789,
      medicines: ['Paracetamol', 'Ibuprofen', 'Aspirin'],
    },
    {
      id: 2,
      name: 'CityCare Pharmacy',
      location: 'Midtown',
      lat: 6.9325,
      lng: 80.7835,
      medicines: ['Paracetamol', 'Amoxicillin', 'Metformin'],
    },
    {
      id: 3,
      name: 'MediHub Pharmacy',
      location: 'North',
      lat: 6.94,
      lng: 80.79,
      medicines: ['Ibuprofen', 'Lisinopril', 'Atorvastatin'],
    },
  ];

  searchPharmacies(medicine: string, location?: string) {
    let results = this.pharmacies.filter((p) =>
      p.medicines.some((m) => m.toLowerCase().includes(medicine.toLowerCase())),
    );

    if (location) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }

  findNearest(lat: number, lng: number, radius: number = 5) {
    const results = this.pharmacies
      .map((pharmacy) => ({
        ...pharmacy,
        distance: this.calculateDistance(lat, lng, pharmacy.lat, pharmacy.lng),
      }))
      .filter((p) => p.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }

  matchPharmacy(matchDto: any) {
    const { medicine, location } = matchDto;
    return this.searchPharmacies(medicine, location);
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
