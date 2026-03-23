// Import NestJS module decorator
import { Module } from '@nestjs/common';

// Import MongooseModule to register MongoDB schemas
import { MongooseModule } from '@nestjs/mongoose';

// Import controller and service for pharmacy inventory
import { PharmacyInventoryController } from './pharmacy-inventory.controller';
import { PharmacyInventoryService } from './pharmacy-inventory.service';

// Import Medicine schema
import { Medicine, MedicineSchema } from './schemas/medicine.schema';

@Module({
  imports: [
    // Register Medicine schema so it can be used with MongoDB
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],

  // Register controller that handles API routes
  controllers: [PharmacyInventoryController],

  // Register service that contains business logic
  providers: [PharmacyInventoryService],
})
export class PharmacyInventoryModule {}