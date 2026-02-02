import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto, UpdateSessionDto } from './dto/session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.create(dto);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }
}