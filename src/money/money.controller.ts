import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoneyService } from './money.service';
import { CreateMoneyDto, UpdateMoneyDto } from './dto/money.dto';

@Controller('money')
export class MoneyController {
  constructor(private readonly moneyService: MoneyService) {}

  @Post()
  create(@Body() dto: CreateMoneyDto) {
    return this.moneyService.create(dto);
  }

  @Get()
  findAll() {
    return this.moneyService.findAll();
  }
}