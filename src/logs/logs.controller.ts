import { Controller, Get, Query, UseGuards, Delete, ForbiddenException, Req } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogQueryDto } from './dto/log-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async findAll(@Query() query: LogQueryDto) {
    return this.logsService.findAll(query);
  }

  @Delete('cleanup')
  async cleanup(@Query('days') days: string = '30', @Req() req) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Только администратор может очищать логи');
    }
    
    const daysToKeep = parseInt(days);
    const deleted = await this.logsService.cleanupOldLogs(daysToKeep);
    return { 
      message: `Удалено ${deleted} старых записей логов`,
      deleted 
    };
  }
}