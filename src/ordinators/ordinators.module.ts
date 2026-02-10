import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdinatorsService } from './ordinators.service';
import { OrdinatorsController } from './ordinators.controller';
import { Ordinator } from './entities/ordinators.entity';
import { University } from './entities/university.entity';
import { CurrentControl } from './entities/current_control.entity';
import { Money } from './entities/money.entity';
import { Session } from './entities/session.entity';
import { Vacation } from './entities/vacation.entity';
import { EducationInfo } from './entities/education_info.entity';
import { Worker } from '../users/entities/worker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ordinator,
      University,
      CurrentControl,
      Money,
      Session,
      Vacation,
      EducationInfo,
      Worker,
    ]),
  ],
  controllers: [OrdinatorsController],
  providers: [OrdinatorsService],
})
export class OrdinatorsModule {}