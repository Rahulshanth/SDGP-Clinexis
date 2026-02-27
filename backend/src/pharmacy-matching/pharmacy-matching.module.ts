import { Module } from '@nestjs/common';
import { PharmacyMatchingController } from './pharmacy-matching.controller';
import { PharmacyMatchingService } from './pharmacy-matching.service';

@Module({
  controllers: [PharmacyMatchingController],
  providers: [PharmacyMatchingService],
  exports: [PharmacyMatchingService],
})
export class PharmacyMatchingModule {}