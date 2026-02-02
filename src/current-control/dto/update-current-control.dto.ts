import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrentControlDto } from './create-current-control.dto';

export class UpdateCurrentControlDto extends PartialType(
  CreateCurrentControlDto,
) {}