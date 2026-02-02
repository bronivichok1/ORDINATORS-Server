import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from './entities/vacation.entity';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation)
    private readonly vacationRepo: Repository<Vacation>,
  ) {}

  findAll() {
    return this.vacationRepo.find();
  }

  findByOrdinator(ordinatorId: number) {
  return this.vacationRepo.find({
    where: {
      ordinator: { id: ordinatorId },
    },
  });
 }

  create(dto: CreateVacationDto) {
    const vacation = this.vacationRepo.create(dto);
    return this.vacationRepo.save(vacation);
  }
}