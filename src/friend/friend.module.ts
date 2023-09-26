import { Module, forwardRef } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend.request.entity';
import { Friend } from './entities/friend.entity';
import { PostModule } from 'src/mind/post/post.module';

@Module({
    imports: [
        UsersModule,
        forwardRef(() => PostModule),
        TypeOrmModule.forFeature([FriendRequest, Friend])
    ],
    controllers: [FriendController],
    providers: [FriendService],
    exports: [FriendService]
})
export class FriendModule { }
