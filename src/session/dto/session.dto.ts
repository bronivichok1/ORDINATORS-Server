import { IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  @IsDateString()
  start: string;

  @IsOptional()
  @IsDateString()
  end: string;

  @IsString()
  ordinators_id: number;
}

export class UpdateSessionDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}