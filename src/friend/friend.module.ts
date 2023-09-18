import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend.request.entity';
import { Friend } from './entities/friend.entity';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([FriendRequest, Friend])
    ],
    controllers: [FriendController],
    providers: [FriendService]
})
export class FriendModule { }
