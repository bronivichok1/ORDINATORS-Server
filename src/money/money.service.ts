import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Money } from './entities/money.entity';
import { CreateMoneyDto, UpdateMoneyDto } from './dto/money.dto';

@Injectable()
export class MoneyService {
  constructor(
    @InjectRepository(Money)
    private readonly moneyRepo: Repository<Money>,
  ) {}

  create(dto: CreateMoneyDto) {
    const money = this.moneyRepo.create(dto);
    return this.moneyRepo.save(money);
  }

  findAll() {
    return this.moneyRepo.find();
  }

}