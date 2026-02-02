import { IsString, IsDateString } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  name: string;

  @IsDateString()
  graduation_year: string;

  @IsString()
  department: string;

  @IsString()
  profile: string;

  @IsString()
  speciality: string;

  @IsString()
  education_form: string;

  @IsString()
  ordinators_id: string;
}