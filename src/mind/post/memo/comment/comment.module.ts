import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { LikeModule } from './like/like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindPostMemoComment } from './entities/mind-post-memo-comment.entity';
import { PostModule } from '../../post.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    LikeModule,
    TypeOrmModule.forFeature([
      MindPostMemoComment
    ]),

    forwardRef(() => PostModule),
    FriendModule
  ]
})
export class CommentModule {}
