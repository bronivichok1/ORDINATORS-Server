import { IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateMoneyDto {
  @IsOptional()
  @IsDateString()
  start: string;

  @IsOptional()
  @IsDateString()
  end: string;

  @IsString()
  ordinators_id: number;
}

export class UpdateMoneyDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}