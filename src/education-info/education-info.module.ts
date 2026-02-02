import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationInfo } from './entities/education-info.entity';
import { EducationInfoService } from './education-info.service';
import { EducationInfoController } from './education-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EducationInfo])],
  controllers: [EducationInfoController],
  providers: [EducationInfoService],
})
export class EducationInfoModule {}
