import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardTagMap } from '../card-tag-map/entities/card-tag-map.entity';
import { MindCard } from '../card/entities/mind-card.entity';
import { MindTag } from '../tag/entities/mind-tag.entity';
import { MindPostCard } from './entities/mind-post-card.entity';
import { MindPostImage } from './entities/mind-post-image.entity';
import { MindPost } from './entities/mind-post.entity';
import { MindPostMemoComment } from './memo/comment/entities/mind-post-memo-comment.entity';
import { MindPostMemoCommentLike } from './memo/comment/like/entities/mind-post-memo-comment-like.entity';
import { MindPostMemo } from './memo/entities/mind-post-memo.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [MemoModule, TypeOrmModule.forFeature([
    MindCard,
    MindTag,
    CardTagMap,
    MindPost,
    MindPostCard,
    MindPostImage,
    MindPostMemo,
    MindPostMemoComment,
    MindPostMemoCommentLike
  ]),],
  exports: [
    PostService
  ]
})
export class PostModule { }
