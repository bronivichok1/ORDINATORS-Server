import {IsOptional } from 'class-validator';

export class CreateCurrentControlDto {
  ordinatorId: number;
  control_date: string;

  @IsOptional()
  result: string;

  @IsOptional()
  comment?: string;
}