// Import NestJS module decorator
import { Module } from '@nestjs/common';

// Import MongooseModule to register schemas
import { MongooseModule } from '@nestjs/mongoose';

// Import controller and service
import { PharmacyMatchingController } from './pharmacy-matching.controller';
import { PharmacyMatchingService } from './pharmacy-matching.service';

// Import PharmacyProfile schema
import { PharmacyProfile, PharmacyProfileSchema } from '../pharmacy-profile/schemas/pharmacy-profile.schema';

@Module({
  imports: [
    // Register PharmacyProfile schema so it can be used in this module
    MongooseModule.forFeature([
      { name: PharmacyProfile.name, schema: PharmacyProfileSchema },
    ]),
  ],

  controllers: [PharmacyMatchingController],

  providers: [PharmacyMatchingService],
})
export class PharmacyMatchingModule {}
