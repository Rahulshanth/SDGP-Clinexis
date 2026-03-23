// Import the Module decorator from NestJS
// This is used to define a module
import { Module } from '@nestjs/common';

// Import controller that handles pharmacy API requests
// Example: POST /pharmacy , GET /pharmacy
import { PharmacyController } from './pharmacy.controller';

// Import service that contains business logic
// Example: create pharmacy, update stock, get pharmacies
import { PharmacyService } from './pharmacy.service';

// Import other modules used inside pharmacy module
// PharmacyProfileModule handles pharmacy profile details
import { PharmacyProfileModule } from '../pharmacy-profile/pharmacy-profile.module';

// PharmacyMatchingModule handles medicine matching logic
import { PharmacyMatchingModule } from '../pharmacy-matching/pharmacy-matching.module';

// Import Mongoose module to connect MongoDB schema
import { MongooseModule } from '@nestjs/mongoose';

// Import Pharmacy schema that defines pharmacy database structure
import { Pharmacy, PharmacySchema } from './schemas/pharmacy.schema';

@Module({
  /*
  IMPORTS

  This section loads modules and database schemas
  used by this module.
  */
  imports: [
    // Register Pharmacy schema with MongoDB
    // This allows NestJS to access the "pharmacies" collection
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
    ]),

    // Module for pharmacy profile management
    PharmacyProfileModule,

    // Module that performs pharmacy medicine matching
    PharmacyMatchingModule,
  ],

  /*
  CONTROLLERS

  Controllers handle HTTP requests coming from frontend.
  */
  controllers: [PharmacyController],

  /*
  PROVIDERS-Providers are services containing the main business logic.
  */
  providers: [PharmacyService],

  /*
  EXPORTS-Exporting PharmacyService allows other modules
  (like pharmacy-matching) to use its functions.
  */
  exports: [PharmacyService],
})

// Define the Pharmacy Module
export class PharmacyModule { }
