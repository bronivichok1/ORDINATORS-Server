import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateEducationInfoDto {
  @IsDateString()
  date_enrollment: string;

  @IsString()
  number_enrollment: string;

  @IsOptional()
  @IsDateString()
  date_expulsion?: string;

  @IsOptional()
  @IsString()
  number_expulsion?: string;

  @IsOptional()
  @IsString()
  reason_expulsion?: string;
}
