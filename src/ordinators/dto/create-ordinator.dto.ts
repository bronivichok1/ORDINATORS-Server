import {
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateEducationInfoDto } from '../../education-info/dto/create-education-info.dto';
import { CreateMoneyDto } from '../../money/dto/money.dto';
import { CreateSessionDto } from '../../session/dto/session.dto';
import { CreateUniversityDto } from '../../university/dto/create-university.dto';
import { CreateVacationDto } from '../../vacation/dto/create-vacation.dto';
import { CreateCurrentControlDto } from '../../current-control/dto/create-current-control.dto';

export class CreateOrdinatorDto {
    @IsString()
    pasnumber: string;

    @IsOptional()
    @IsString()
    lastname_ru: string;

    @IsOptional()
    @IsString()
    firstname_ru: string;

    @IsOptional()
    @IsString()
    patronymic_ru?: string;

    @IsOptional()
    @IsString()
    lastname_en: string;

    @IsOptional()
    @IsString()
    firstname_en: string;

    @IsOptional()
    @IsString()
    patronymic_en?: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsDateString()
    birth_date: string;

    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    mobile: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    login: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsIn(['Y', 'N'])
    medicalcertificate: 'Y' | 'N';

    @IsIn(['Y', 'N'])
    rivshcertificate: 'Y' | 'N';

    @IsString()
    doc_type: string;

    @IsOptional()
    @IsIn(['Y', 'N'])
    invite: 'Y' | 'N';

    @IsOptional()
    @IsString()
    agreement: string;

    @IsOptional()
    @IsString()
    distribution: string;

    @IsOptional()
    @IsString()
    teacher: string;

    @IsOptional()
    @IsString()
    living_place: string;

    @IsOptional()
    @IsDateString()
    registration_deadline: string;
   
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationInfoDto)
  @IsOptional()
  educationInfo?: CreateEducationInfoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMoneyDto)
  @IsOptional()
  money?: CreateMoneyDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSessionDto)
  @IsOptional()
  sessions?: CreateSessionDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateUniversityDto)
  @IsOptional()
  universities?: CreateUniversityDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateVacationDto)
  @IsOptional()
  vacations?: CreateVacationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCurrentControlDto)
  @IsOptional()
  currentСontrols?: CreateCurrentControlDto[];
}
  