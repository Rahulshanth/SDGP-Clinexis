import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePharmacyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsArray()
  @IsOptional()
  medicines?: string[];
}
