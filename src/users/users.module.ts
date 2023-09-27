import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FCMToken } from './entities/fcm-token.entity';
import { FCMService } from './fcm.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FCMToken])],
  controllers: [UsersController],
  providers: [UsersService, FCMService],
  exports: [UsersService]
})
export class UsersModule {}
