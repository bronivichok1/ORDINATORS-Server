import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation])],
  controllers: [VacationController],
  providers: [VacationService],
})
export class VacationModule {}