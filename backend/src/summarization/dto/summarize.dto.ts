import { IsString, IsNotEmpty } from 'class-validator';

export class SummarizeDto {
  @IsString()
  @IsNotEmpty()
  consultationText: string;
}

//edit by rivithi
