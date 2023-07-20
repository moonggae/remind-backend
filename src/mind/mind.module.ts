import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindCard } from './card/entities/mind-card.entity';
import { MindTag } from './tag/entities/mind-tag.entity';
import { RouterModule } from '@nestjs/core';
import { CardTagMapModule } from './card-tag-map/card-tag-map.module';
import { CardTagMap } from './card-tag-map/entities/card-tag-map.entity';
import { PostModule } from './post/post.module';
import { MindPost } from './post/entities/mind-post.entity';
import { MindPostCard } from './post/entities/mind-post-card.entity';
import { MindPostMemo } from './post/memo/entities/mind-post-memo.entity';
import { MindPostMemoComment } from './post/memo/comment/entities/mind-post-memo-comment.entity';
import { MindPostImage } from './post/entities/mind-post-image.entity';
import { MindPostMemoCommentLike } from './post/memo/comment/like/entities/mind-post-memo-comment-like.entity';

@Module({
  imports: [
    CardModule, 
    TagModule,
    CardTagMapModule,
    PostModule,

    TypeOrmModule.forFeature([
      MindCard, 
      MindTag,
      CardTagMap,
      MindPost,
      MindPostCard,
      MindPostImage,
      MindPostMemo,
      MindPostMemoComment,
      MindPostMemoCommentLike
    ]),

    RouterModule.register([{
      path: 'mind', children: [
        { module: CardModule, path: '/' },
        { module: TagModule, path: '/' },
        { module: PostModule, path: '/' }
      ]
    }])
  ]
})
export class MindModule { }
