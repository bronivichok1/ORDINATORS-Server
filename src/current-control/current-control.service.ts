import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentControl } from './entities/current-control.entity';
import { CreateCurrentControlDto } from './dto/create-current-control.dto';
import { UpdateCurrentControlDto } from './dto/update-current-control.dto';
import { Ordinator } from '../ordinators/entities/ordinator.entity';

@Injectable()
export class CurrentControlService {
  constructor(
    @InjectRepository(CurrentControl)
    private readonly currentControlRepo: Repository<CurrentControl>,

    @InjectRepository(Ordinator)
    private readonly ordinatorRepo: Repository<Ordinator>,
  ) {}

  async create(dto: CreateCurrentControlDto) {
    const ordinator = await this.ordinatorRepo.findOne({
      where: { id: dto.ordinatorId },
    });

    if (!ordinator) {
      throw new NotFoundException('Ordinator not found');
    }

    const control = this.currentControlRepo.create({
      control_date: dto.control_date,
      result: dto.result,
      ordinator,
    });

    return await this.currentControlRepo.save(control);
  }

  async findAll() {
    return this.currentControlRepo.find({
      relations: {
        ordinator: true,
      },
    });
  }

}