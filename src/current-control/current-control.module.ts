import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentControlService } from './current-control.service';
import { CurrentControlController } from './current-control.contoller';
import { CurrentControl } from './entities/current-control.entity';
import { Ordinator } from '../ordinators/entities/ordinator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentControl, Ordinator])],
  controllers: [CurrentControlController],
  providers: [CurrentControlService],
})
export class CurrentControlModule {}