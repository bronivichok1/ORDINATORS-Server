import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    // Проверяем, есть ли хоть один админ
    const adminCount = await this.usersService.countAdmins();
    
    // Если нет админов - создаем из .env
    if (adminCount === 0) {
      const adminLogin = this.configService.get<string>('ADMIN_LOGIN', 'admin');
      const adminPassword = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');
      const adminFio = this.configService.get<string>('ADMIN_FIO', 'Администратор');
      
      // Создаем админа
      await this.usersService.createWorker(
        adminFio,
        adminLogin,
        adminPassword,
        'admin'
      );
      
      console.log(`Создан администратор: ${adminLogin}`);
    }

    // Продолжаем обычную авторизацию
    const user = await this.usersService.validateUser(
      loginDto.login,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const payload = { 
      sub: user.id, 
      login: user.login, 
      role: user.role,
      fio: user.fio 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fio: user.fio,
        login: user.login,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByLogin(registerDto.login);
    
    if (existingUser) {
      throw new ConflictException('Пользователь с таким логином уже существует');
    }

    const user = await this.usersService.createWorker(
      registerDto.fio,
      registerDto.login,
      registerDto.password,
      registerDto.role,
    );

    const payload = { 
      sub: user.id, 
      login: user.login, 
      role: user.role,
      fio: user.fio 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fio: user.fio,
        login: user.login,
        role: user.role,
      },
    };
  }

  async validateToken(userId: number) {
    const user = await this.usersService.findOneById(userId);
    
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const { password, ...result } = user;
    return result;
  }
}