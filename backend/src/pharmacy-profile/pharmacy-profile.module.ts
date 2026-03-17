import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyProfileController } from './pharmacy-profile.controller';
import { PharmacyProfileService } from './pharmacy-profile.service';
import {
  PharmacyProfile,
  PharmacyProfileSchema,
} from './schemas/pharmacy-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PharmacyProfile.name, schema: PharmacyProfileSchema },
    ]),
  ],
  controllers: [PharmacyProfileController],
  providers: [PharmacyProfileService],
  exports: [PharmacyProfileService],
})
export class PharmacyProfileModule {}
