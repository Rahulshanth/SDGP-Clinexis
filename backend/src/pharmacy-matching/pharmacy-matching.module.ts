import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyMatchingController } from './pharmacy-matching.controller';
import { PharmacyMatchingService } from './pharmacy-matching.service';
import {
  PharmacyProfile,
  PharmacyProfileSchema,
} from '../pharmacy-profile/schemas/pharmacy-profile.schema';
import {
  Medicine,
  MedicineSchema,
} from '../pharmacy-inventory/schemas/medicine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PharmacyProfile.name, schema: PharmacyProfileSchema },
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],
  controllers: [PharmacyMatchingController],
  providers: [PharmacyMatchingService],
})
export class PharmacyMatchingModule {}