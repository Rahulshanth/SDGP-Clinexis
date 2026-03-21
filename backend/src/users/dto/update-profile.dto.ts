// backend/src/users/dto/update-profile.dto.ts — Created by Vidu
import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  specialization?: string;

  @IsString()
  @IsOptional()
  hospitalName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  clinicLocation?: string;

  @IsString()
  @IsOptional()
  profilePhoto?: string; // URL string for now
}
