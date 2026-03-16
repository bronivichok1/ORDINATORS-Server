import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; 
import { OrdinatorsModule } from './ordinators/ordinators.module';
import { LogsModule } from './logs/logs.module';
import { SessionsModule } from './sessions/sessions.module';
import { SessionMiddleware } from './sessions/session.middleware';
import { Session } from './sessions/session.entity';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}', Session],
      synchronize: true,
    }),
    AuthModule,
    UsersModule, 
    OrdinatorsModule,
    LogsModule,
    SessionsModule, 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}