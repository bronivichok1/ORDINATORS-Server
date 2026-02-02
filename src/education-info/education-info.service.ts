import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationInfo } from './entities/education-info.entity';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';

@Injectable()
export class EducationInfoService {
  constructor(
    @InjectRepository(EducationInfo)
    private repo: Repository<EducationInfo>,
  ) {}

  findByOrdinator(ordinators_id: number) {
    return this.repo.findOne({ where: { ordinators_id } });
  }

  async create(dto: CreateEducationInfoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
}