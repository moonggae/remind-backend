import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
  imports: [CommentModule]
})
export class MemoModule {}
