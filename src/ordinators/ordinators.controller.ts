import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { OrdinatorsService } from './ordinators.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

@UseGuards(JwtAuthGuard)
@Controller('ordinators')
export class OrdinatorsController {
  constructor(
    private readonly ordinatorsService: OrdinatorsService,
  ) {}

  @Get()
  findAll() {
    return this.ordinatorsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateOrdinatorDto) {
    return this.ordinatorsService.create(dto);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.ordinatorsService.findOne(id);
 } 

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordinatorsService.remove(id);
 }

 @Patch(':id')
 update(@Param('id') id: number, @Body() dto: UpdateOrdinatorDto,) {
    return this.ordinatorsService.update(id, dto);
 }
}