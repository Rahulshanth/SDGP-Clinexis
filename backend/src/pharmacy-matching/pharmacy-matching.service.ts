import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyMatchingService {

  // Temporary pharmacy data (later this will come from database)
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
      lat: 6.9400,
      lng: 80.7900,
      medicines: ['Ibuprofen', 'Lisinopril', 'Atorvastatin'],
    },
  ];


  // Search pharmacies that contain a medicine
  searchPharmacies(medicine: string, location?: string) {

    // Filter pharmacies that have the medicine
    let results = this.pharmacies.filter(p =>
      p.medicines.some(m =>
        m.toLowerCase().includes(medicine.toLowerCase())
      )
    );

    // If location is provided, filter by location also
    if (location) {
      results = results.filter(p =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Return search results
    return {
      success: true,
      count: results.length,
      data: results,
    };
  }


  // Find pharmacies near a location
  findNearest(lat: number, lng: number, radius: number = 5) {

    const results = this.pharmacies

      // Calculate distance from user location
      .map(pharmacy => ({
        ...pharmacy,
        distance: this.calculateDistance(
          lat,
          lng,
          pharmacy.lat,
          pharmacy.lng
        ),
      }))

      // Only include pharmacies inside radius
      .filter(p => p.distance <= radius)

      // Sort by nearest
      .sort((a, b) => a.distance - b.distance);

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }


  // Main matching function used by controller
  matchPharmacy(matchDto: any) {

    const { medicine, location } = matchDto;

    // Search pharmacies based on medicine and location
    return this.searchPharmacies(medicine, location);
  }


  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {

    const R = 6371; // Earth radius in km

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Return distance in KM
    return R * c;
  }

}