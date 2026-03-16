import { Controller, Post, Body, Get, UseGuards, Request, Req, Session, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LogsService } from '../logs/logs.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logsService: LogsService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req, @Session() session: any) {
    const result = await this.authService.login(loginDto);
    
    if (result.user) {
      session.userId = result.user.id;
      session.userFio = result.user.fio;
      session.userRole = result.user.role;
      session.loggedIn = true;
      
      await this.logsService.create({
        userId: result.user.id,
        userFio: result.user.fio,
        userRole: result.user.role,
        actionType: 'LOGIN',
        description: `Вход в систему`,
        ipAddress: req.ip,
      });
    }
    
    return result;
  }

  @Post('logout')
  async logout(@Req() req, @Session() session: any) {
    const userId = session.userId;
    const userFio = session.userFio;
    
    return new Promise((resolve) => {
      session.destroy(async (err) => {
        if (err) {
          console.error('Ошибка при уничтожении сессии:', err);
          resolve({ success: false, message: 'Ошибка при выходе' });
        }
        
        if (userId) {
          await this.logsService.create({
            userId,
            userFio,
            actionType: 'LOGOUT',
            description: `Выход из системы`,
            ipAddress: req.ip,
          });
        }
        
        resolve({ success: true, message: 'Выход выполнен успешно' });
      });
    });
  }

  @Get('session-check')
  async checkSession(@Session() session: any) {
    if (session && session.loggedIn) {
      return {
        authenticated: true,
        user: {
          id: session.userId,
          fio: session.userFio,
          role: session.userRole,
        },
      };
    }
    return { authenticated: false };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validate(@Request() req) {
    return this.authService.validateToken(req.user.userId);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Req() req) {
    const result = await this.authService.register(registerDto);
    
    if (result.user) {
      await this.logsService.create({
        userId: result.user.id,
        userFio: result.user.fio,
        userRole: result.user.role,
        actionType: 'REGISTER',
        description: `Регистрация нового пользователя: ${registerDto.login}`,
        ipAddress: req.ip,
      });
    }
    
    return result;
  }
}