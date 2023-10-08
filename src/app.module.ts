import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { DelayMiddleware } from './common/util/DelayMiddleware';
import { LoggerMiddleware } from './common/logger.midleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendModule } from './friend/friend.module';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
      renderPath: '.well-known',
      serveStaticOptions: {
        index: false,
        redirect: false
      }
    }),

    UsersModule,
    AuthModule,
    MindModule,
    ImageModule,
    FriendModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
    // .apply(DelayMiddleware)
    // .forRoutes('')
    .apply(LoggerMiddleware)
    .forRoutes('*')
  }
}
