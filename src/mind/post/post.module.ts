import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MemoModule } from './memo/memo.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [MemoModule]
})
export class PostModule {}
