import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConsultationDto {

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsOptional()
  @IsString()
  transcription?: string;

  @IsOptional()
  @IsString()
  audio?: string;
}

//Added by Nadithi