import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../post.service';

@Controller('')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createCommentDto: CreateCommentDto) {
        const authorized = await this.postService.authorize(user.id, { memoId: createCommentDto.memoId })
        if (!authorized) throw new UnauthorizedException()
        return this.commentService.create(user.id, createCommentDto.memoId, createCommentDto.text)
    }
}
