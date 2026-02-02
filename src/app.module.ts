import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; // ДОЛЖЕН БЫТЬ ИМПОРТ
import { OrdinatorsModule } from './ordinators/ordinators.module';
import { EducationInfoModule } from './education-info/education-info.module';
import { UniversityModule } from './university/university.module';
import { MoneyModule } from './money/money.module';
import { SessionModule } from './session/session.module';
import { VacationModule } from './vacation/vacation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'Residents',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UsersModule, // ВАЖНО: этот модуль должен быть здесь
    OrdinatorsModule,
    EducationInfoModule,
    UniversityModule,
    MoneyModule,
    SessionModule,
    VacationModule,
  ],
})
export class AppModule {}