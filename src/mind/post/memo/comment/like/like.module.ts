import { Module, forwardRef } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindPostMemoCommentLike } from './entities/mind-post-memo-comment-like.entity';
import { PostModule } from 'src/mind/post/post.module';

@Module({
    controllers: [LikeController],
    providers: [LikeService],
    imports: [
        TypeOrmModule.forFeature([
            MindPostMemoCommentLike
        ]),

        forwardRef(() => PostModule)
    ]
})
export class LikeModule { }
