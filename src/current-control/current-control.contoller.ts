import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentControlService } from './current-control.service';
import { CreateCurrentControlDto } from './dto/create-current-control.dto';
import { UpdateCurrentControlDto } from './dto/update-current-control.dto';

@Controller('current-control')
export class CurrentControlController {
  constructor(private readonly service: CurrentControlService) {}

  @Post()
  create(@Body() dto: CreateCurrentControlDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}