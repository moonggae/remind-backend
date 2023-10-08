import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FCMToken } from './entities/fcm-token.entity';
import { FriendModule } from 'src/friend/friend.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FCMToken]),
        FriendModule
    ],
    controllers: [NotificationController],
    providers: [NotificationService]
})
export class NotificationModule { }
