import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { LikeModule } from './like/like.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [LikeModule]
})
export class CommentModule {}
