// Import validation decorators from class-validator
import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator';

// DTO used when creating a new pharmacy
export class CreatePharmacyDto {

  // Pharmacy name (required string)
  @IsString()
  @IsNotEmpty()
  name: string;

  // Pharmacy email (must be valid email format)
  @IsEmail()
  email: string;

  // Pharmacy location (city / area)
  @IsString()
  @IsNotEmpty()
  location: string;

  // Contact phone number
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  // List of medicines available in the pharmacy
  // Optional because pharmacy may add medicines later
  @IsArray()
  @IsOptional()
  medicines?: string[];
}