import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { PostService } from 'src/mind/post/post.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FriendService } from 'src/friend/friend.service';

@Controller('')
export class LikeController {
    constructor(
        private readonly likeService: LikeService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly friendService: FriendService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createLikeDto: CreateLikeDto) {
        let authorized = await this.postService.authorize(user.id, { commentId: createLikeDto.commentId })
        if(!authorized) authorized = await this.friendService.postAuthorize(user.id, { commentId: createLikeDto.commentId })
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
    @Delete(':id')
    async delete(@CtxUser() user: ContextUser, @Param('id') id: string) {
        const authorized = this.postService.authorize(user.id, { likeId: +id })
        if(!authorized) throw new UnauthorizedException()
        return await this.likeService.delete(+id)
    }
}