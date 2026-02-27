import { Module } from '@nestjs/common';
import { PharmacyProfileController } from './pharmacy-profile.controller';
import { PharmacyProfileService } from './pharmacy-profile.service';

@Module({
  controllers: [PharmacyProfileController],
  providers: [PharmacyProfileService],
  exports: [PharmacyProfileService],
})
export class PharmacyProfileModule {}