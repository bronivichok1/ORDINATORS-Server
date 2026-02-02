import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Controller('vacation')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Get()
  findAll() {
    return this.vacationService.findAll();
  }

  @Post()
  create(@Body() dto: CreateVacationDto) {
    return this.vacationService.create(dto);
  }
}