import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordinator } from './entities/ordinator.entity';
import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

@Injectable()
export class OrdinatorsService {
  constructor(
    @InjectRepository(Ordinator)
    private readonly ordinatorRepo: Repository<Ordinator>,
  ) {}

  findAll() {
  return this.ordinatorRepo.find({
    relations: {
      educationInfo: true,
      universities: true,
      sessions: true,
      money: true,
      vacations: true,
      currentControls: true,
    },
  });
  }
  
  create(dto: CreateOrdinatorDto) {
  const ordinator = this.ordinatorRepo.create(dto);
    return this.ordinatorRepo.save(ordinator);
 }

  findOne(id: number) {
    return this.ordinatorRepo.findOneBy({ id });
  }

  async remove(id: number) {
    await this.ordinatorRepo.delete({ id });
    return { deleted: true };
  }

  async update(id: number, dto: UpdateOrdinatorDto) {
    await this.ordinatorRepo.update({ id }, dto);
    return this.findOne(id);
  }  
}
