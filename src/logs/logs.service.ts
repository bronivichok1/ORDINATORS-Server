import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { LogQueryDto } from './dto/log-query.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const log = this.logsRepository.create(createLogDto);
      return await this.logsRepository.save(log);
    } catch (error) {
      console.error('Ошибка при сохранении лога:', error);
      return null;
    }
  }

  async cleanupOldLogs(daysToKeep: number = 30): Promise<number> {
  const result = await this.logsRepository
    .createQueryBuilder()
    .delete()
    .from(Log)
    .execute();
  
  return result.affected || 0;
}

  async findAll(query: LogQueryDto): Promise<{ logs: Log[]; total: number }> {
    const { page = 1, limit = 50, userId, actionType, startDate, endDate, userRole, search } = query;
    const skip = (page - 1) * limit;
  
    const queryBuilder = this.logsRepository.createQueryBuilder('log');
  
    if (userId) {
      queryBuilder.andWhere('log.userId = :userId', { userId });
    }
  
    if (actionType) {
      queryBuilder.andWhere('log.actionType ILIKE :actionType', { actionType: `%${actionType}%` });
    }
  
    if (userRole) {
      queryBuilder.andWhere('log.userRole = :userRole', { userRole });
    }
  
    if (search) {
      queryBuilder.andWhere(
        '(log.description ILIKE :search OR log.userFio ILIKE :search OR log.details ILIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    if (startDate && endDate) {
      queryBuilder.andWhere('log.timestamp BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }
  
    const [logs, total] = await queryBuilder
      .orderBy('log.timestamp', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  
    return { logs, total };
  }
}