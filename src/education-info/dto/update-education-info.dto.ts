import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationInfoDto } from './create-education-info.dto';

export class UpdateEducationInfoDto extends PartialType(CreateEducationInfoDto) {}
