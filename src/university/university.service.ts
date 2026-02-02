import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepo: Repository<University>,
  ) {}

  create(dto: CreateUniversityDto) {
    const entity = this.universityRepo.create(dto);
    return this.universityRepo.save(entity);
  }
}