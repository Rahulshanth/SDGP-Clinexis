import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PharmacyProfile,
  PharmacyProfileDocument,
} from '../pharmacy-profile/schemas/pharmacy-profile.schema';
import {
  Medicine,
  MedicineDocument,
} from '../pharmacy-inventory/schemas/medicine.schema';

@Injectable()
export class PharmacyMatchingService {
  constructor(
    @InjectModel(PharmacyProfile.name)
    private pharmacyProfileModel: Model<PharmacyProfileDocument>,
    @InjectModel(Medicine.name)
    private medicineModel: Model<MedicineDocument>,
  ) {}

  // Search pharmacies by medicine name
  async searchPharmacies(medicine: string, location?: string) {
    // Find medicines matching the search term in inventory
    const matchingMedicines = await this.medicineModel.find({
      name: { $regex: medicine, $options: 'i' },
    }).exec();

    // Get unique pharmacy IDs from matched medicines
    const pharmacyIds = [...new Set(
      matchingMedicines.map((m) => m.pharmacyId?.toString())
    )];

    // Get pharmacy profiles for those IDs
    let results = await this.pharmacyProfileModel.find({
      _id: { $in: pharmacyIds },
    }).exec();

    // Optional location filter
    if (location) {
      results = results.filter((pharmacy) =>
        pharmacy.address?.toLowerCase().includes(location.toLowerCase()),
      );
    }

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }

  // Find nearest pharmacies
  async findNearest(lat: number, lng: number, radius: number = 5) {
    const pharmacies = await this.pharmacyProfileModel.find().exec();
    const results = pharmacies
      .map((pharmacy) => ({
        pharmacyName: pharmacy.name,
        address: pharmacy.address,
        phone: pharmacy.phone,
        latitude: pharmacy.latitude,
        longitude: pharmacy.longitude,
        distance: this.calculateDistance(
          lat,
          lng,
          pharmacy.latitude,
          pharmacy.longitude,
        ),
      }))
      .filter((p) => p.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return {
      success: true,
      count: results.length,
      data: results,
    };
  }

  // Match pharmacies with multiple medicines
  async matchPharmacies(medicines: string[]) {
  const profiles = await this.pharmacyProfileModel.find().exec();

  const results = await Promise.all(
    profiles.map(async (profile) => {
      // Get medicines from inventory for this pharmacy
      const inventoryMedicines = await this.medicineModel.find({
        pharmacyId: profile._id.toString(),
      }).exec();

      const inventoryNames = inventoryMedicines.map((m) => m.name);

      const matchedMedicines = medicines.filter((med) =>
        inventoryNames.some((invMed) =>
          invMed.toLowerCase().includes(med.toLowerCase()),
        ),
      );

      const missingMedicines = medicines.filter(
        (med) => !matchedMedicines.includes(med),
      );

      return {
        pharmacyId: profile._id,
        pharmacyName: profile.name,
        address: profile.address,
        phone: profile.phone,
        latitude: profile.latitude,
        longitude: profile.longitude,
        matchedMedicines,
        missingMedicines,
        matchCount: matchedMedicines.length,
      };
    }),
  );

  results.sort((a, b) => b.matchCount - a.matchCount);

  return {
    success: true,
    totalPharmacies: results.length,
    data: results,
  };
}

  // Distance calculation (Haversine formula)
  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371;
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