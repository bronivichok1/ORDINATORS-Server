import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';

@Module({
  imports: [TypeOrmModule.forFeature([University])],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}