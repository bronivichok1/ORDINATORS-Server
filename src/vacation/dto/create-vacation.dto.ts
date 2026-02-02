import { IsString, IsOptional } from 'class-validator';

export class CreateVacationDto {
  @IsOptional()
  @IsString()
  cause: string;

  @IsOptional()
  @IsString()
  duration: string;

  @IsString()
  ordinators_id: number;
}