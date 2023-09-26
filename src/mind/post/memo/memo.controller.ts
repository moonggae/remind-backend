import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UnauthorizedException, forwardRef } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { PostService } from '../post.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { FriendService } from 'src/friend/friend.service';
import { identity } from 'rxjs';

@Controller('')
export class MemoController {
    constructor(
        private readonly memoService: MemoService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly friendService: FriendService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createMemoDto: CreateMemoDto) {
        const authorized = await this.postService.authorize(user.id, { postId: createMemoDto.postId })
        if(!authorized) throw new UnauthorizedException()
        return this.memoService.create(createMemoDto.postId, createMemoDto.text)
    }

    @ApiBearerAuth('access-token')
    @Get(':id')
    async findOne(@CtxUser() user: ContextUser, @Param('id') id: string) {
        let authorized = await this.postService.authorize(user.id, { memoId: +id })
        if(!authorized) {
            authorized = await this.friendService.postAuthorize(user.id, { memoId: +id })
        }
        if(!authorized) {
            throw new UnauthorizedException()
        }
        return this.memoService.findOne(+id)
    }

    @ApiBearerAuth('access-token')
    @Patch(':id')
    async update(@CtxUser() user: ContextUser, @Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto) {
        let authorized = await this.postService.authorize(user.id, { memoId: +id })
        if(!authorized) throw new UnauthorizedException()
        return this.memoService.update(+id, updateMemoDto.text)
    }

    @ApiBearerAuth('access-token')
    @Delete(':id')
    async delete(@CtxUser() user: ContextUser, @Param('id') id: string) {
        const authorized = await this.postService.authorize(user.id, { memoId: +id })
        if(!authorized) throw new UnauthorizedException()
        await this.memoService.delete(+id)
    }
}