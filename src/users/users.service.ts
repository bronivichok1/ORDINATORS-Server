import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Worker)
    private workersRepository: Repository<Worker>,
  ) {}

  async findOneByLogin(login: string): Promise<Worker | null> {
    return this.workersRepository.findOne({ where: { login } });
  }

  async findOneById(id: number): Promise<Worker | null> {
    return this.workersRepository.findOne({ where: { id } });
  }

  async createWorker(
    fio: string,
    login: string,
    password: string,
    role: string = 'user',
  ): Promise<Worker> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const worker = this.workersRepository.create({
      fio,
      login,
      password: hashedPassword,
      role,
    });

    return this.workersRepository.save(worker);
  }

  async validateUser(login: string, password: string): Promise<Worker | null> {
    const worker = await this.findOneByLogin(login);
    
    if (worker && await bcrypt.compare(password, worker.password)) {
      const { password, ...result } = worker;
      return result as Worker;
    }
    
    return null;
  }
}