import { Module } from '@nestjs/common';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { PharmacyProfileModule } from '../pharmacy-profile/pharmacy-profile.module';
import { PharmacyMatchingModule } from '../pharmacy-matching/pharmacy-matching.module';

@Module({
  imports: [PharmacyProfileModule, PharmacyMatchingModule],
  controllers: [PharmacyController],
  providers: [PharmacyService],
  exports: [PharmacyService],
})
export class PharmacyModule {}
