// Import PartialType helper from NestJS
// It allows us to reuse CreatePharmacyDto but make all fields optional
import { PartialType } from '@nestjs/mapped-types';

// Import the Create DTO to extend from it
import { CreatePharmacyDto } from './create-pharmacy.dto';

// DTO used when updating a pharmacy
// All fields from CreatePharmacyDto become optional automatically
export class UpdatePharmacyDto extends PartialType(CreatePharmacyDto) {}