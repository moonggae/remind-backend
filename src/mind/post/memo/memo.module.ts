import { Module, forwardRef } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindPostMemo } from './entities/mind-post-memo.entity';
import { PostModule } from '../post.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [
    CommentModule,
    TypeOrmModule.forFeature([
      MindPostMemo
    ]),

    forwardRef(() => PostModule),
    FriendModule
  ]
})
export class MemoModule {}
