import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { PostService } from 'src/mind/post/post.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteLikeDto } from './dto/delete-like.dto';

@Controller('')
export class LikeController {
    constructor(
        private readonly likeService: LikeService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createLikeDto: CreateLikeDto) {
        const authorized = this.postService.authorize(user.id, { commentId: createLikeDto.commentId })
        if(!authorized) throw new UnauthorizedException()
        try {
            return await this.likeService.create(createLikeDto.commentId, user.id)    
        } catch (error) {
            if(`${error}`.includes('Duplicate entry')) {
                throw new ConflictException()
            } else {
                throw new BadRequestException()
            }
        }
    }

    @ApiBearerAuth('access-token')
    @Delete()
    async delete(@CtxUser() user: ContextUser, @Body() deleteLikeDto: DeleteLikeDto) {
        const authorized = this.postService.authorize(user.id, { commentId: deleteLikeDto.commentId })
        if(!authorized) throw new UnauthorizedException()
        return await this.likeService.delete(deleteLikeDto.commentId, user.id)
    }
}