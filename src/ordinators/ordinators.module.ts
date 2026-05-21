import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdinatorsController } from './ordinators.controller';
import { OrdinatorsService } from './ordinators.service';
import { Ordinator } from './entities/ordinators.entity';
import { University } from './entities/university.entity';
import { CurrentControl } from './entities/current_control.entity';
import { Money } from './entities/money.entity';
import { Session } from './entities/session.entity';
import { Vacation } from './entities/vacation.entity';
import { EducationInfo } from './entities/education_info.entity';
import { SocialLeave } from './entities/social_leave.entity';
import { Supervisor } from './entities/supervisors.entity';
import { LogsModule } from '../logs/logs.module';

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
      SocialLeave,
      Supervisor,
    ]),
    LogsModule,
  ],
  controllers: [OrdinatorsController],
  providers: [OrdinatorsService],
  exports: [OrdinatorsService],
})
export class OrdinatorsModule {}