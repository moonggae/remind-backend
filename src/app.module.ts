import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { MindModule } from './mind/mind.module';
import { ImageModule } from './image/image.module';
import { ormconfig } from 'ormconfig';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),

    UsersModule,
    AuthModule,
    MindModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
