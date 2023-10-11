import { Global, Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FCMToken } from './entities/fcm-token.entity';
import { FriendModule } from 'src/friend/friend.module';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([FCMToken]),
        forwardRef(() => FriendModule)
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule { }
