import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseIntPipe,
    Req,
    BadRequestException,
  } from '@nestjs/common';
  import { OrdinatorsService } from './ordinators.service';
  import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
  import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';
  import { LogsService } from '../logs/logs.service'; 
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('ordinators')
  @UseGuards(JwtAuthGuard)
  export class OrdinatorsController {
    constructor(
      private readonly ordinatorsService: OrdinatorsService,
      private readonly logsService: LogsService, 
    ) {}
  
    @Post()
    async create(@Body() createOrdinatorDto: CreateOrdinatorDto, @Req() req) {
      const result = await this.ordinatorsService.create(createOrdinatorDto);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'CREATE_ORDINATOR',
        description: `Создание ординатора: ${createOrdinatorDto.fio}`,
        targetInfo: `ID: ${result.id}`,
        ipAddress: req.ip,
      });
      
      return result;
    }
  
    @Get()
    async findAll(@Query() filters: any, @Req() req) {
      const result = await this.ordinatorsService.findAll();
      
      if (Object.keys(filters).length > 0) {
        await this.logsService.create({
          userId: req.user?.id,
          userFio: req.user?.fio,
          userRole: req.user?.role,
          actionType: 'VIEW_LIST',
          description: `Просмотр списка ординаторов с фильтрами`,
          targetInfo: `Фильтры: ${JSON.stringify(filters)}`,
          ipAddress: req.ip,
        });
      }
      
      return result;
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
      const result = await this.ordinatorsService.findOne(id);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'VIEW_ORDINATOR',
        description: `Просмотр карточки ординатора: ${result?.fio}`,
        targetInfo: `ID: ${id}`,
        ipAddress: req.ip,
      });
      
      return result;
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateOrdinatorDto: UpdateOrdinatorDto,
      @Req() req,
    ) {
      const oldData = await this.ordinatorsService.findOne(id);
      const result = await this.ordinatorsService.update(id, updateOrdinatorDto);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'UPDATE_ORDINATOR',
        description: `Обновление данных ординатора: ${oldData?.fio}`,
        targetInfo: `ID: ${id}`,
        ipAddress: req.ip,
      });
      
      return result;
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
      const ordinator = await this.ordinatorsService.findOne(id);
      await this.ordinatorsService.remove(id);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'DELETE_ORDINATOR',
        description: `Удаление ординатора: ${ordinator?.fio}`,
        targetInfo: `ID: ${id}, Удалил: ${req.user?.fio} (${req.user?.role})`,
        ipAddress: req.ip,
      });
      
      return { success: true };
    }

    @Delete('bulk')
async bulkRemove(@Body('ids') ids: number[], @Req() req) {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new BadRequestException('Не передан массив ID для удаления');
  }
  
  let successCount = 0;
  let errorCount = 0;
  const failedIds = [];
  
  for (const id of ids) {
    try {
      const ordinator = await this.ordinatorsService.findOne(id);
      await this.ordinatorsService.remove(id);
      
      await this.logsService.create({
        userId: req.user?.id,
        userFio: req.user?.fio,
        userRole: req.user?.role,
        actionType: 'DELETE_ORDINATOR',
        description: `Удаление ординатора: ${ordinator?.fio}`,
        targetInfo: `ID: ${id}, Удалил: ${req.user?.fio} (${req.user?.role})`,
        ipAddress: req.ip,
      });
      
      successCount++;
    } catch (error) {
      errorCount++;
      failedIds.push(id);
    }
  }
  
  return {
    success: true,
    successCount,
    errorCount,
    failedIds,
    message: `Удалено ${successCount} из ${ids.length} записей`
  };
}
  }