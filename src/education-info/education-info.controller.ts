import { Controller, Get, Post, Patch, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EducationInfoService } from './education-info.service';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';

@UseGuards(JwtAuthGuard)
@Controller('education-info')
export class EducationInfoController {
  constructor(private service: EducationInfoService) {}

  @Post()
  create(@Body() dto: CreateEducationInfoDto) {
    return this.service.create(dto);
  }
}