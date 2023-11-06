import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateMindPostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { MindPost } from './entities/mind-post.entity';
import { UpdateMindPostDto } from './dto/update-post.dto';
import { FriendService } from 'src/friend/friend.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationContent } from 'src/notification/models/notification-content';
import { PaginationPostDto } from './dto/pagination-post.dto';
import { SocketService } from 'src/socket/socket.service';
import { SOCKET_EVENT } from 'src/common/enum/socket-event.enum';

@Controller('')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly friendService: FriendService,
        private readonly notificationService: NotificationService,
        private readonly socketService: SocketService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createDto: CreateMindPostDto): Promise<MindPost> {
        const post = await this.postService.create(user.id, createDto)

        this.notificationService.sendNotificationToFriend(user.id, new NotificationContent({
            type: "MIND.POST",
            targetId: `${post.id}`,
            displayName: user.displayName
        }))

        this.socketService.pushToFriend(user.id, SOCKET_EVENT.MIND_POST, post)

        return post
    }

    @ApiBearerAuth('access-token')
    @Put(':id')
    async update(@CtxUser() user: ContextUser, @Param('id') id: String, @Body() updateDto: UpdateMindPostDto): Promise<MindPost> {
        const item = await this.postService.findOne(+id, user.id)

        if (!item) {
            throw new UnauthorizedException()
        }

        const updatedPost = await this.postService.update(item.id, updateDto)

        this.socketService.pushToFriend(user.id, SOCKET_EVENT.MIND_POST, updatedPost)

        return updatedPost
    }

    @ApiBearerAuth('access-token')
    @Delete(':id')
    async delete(@CtxUser() user: ContextUser, @Param('id') id: String) {
        const item = await this.postService.findOne(+id, user.id)

        if (!item) {
            throw new UnauthorizedException()
        }

        return this.postService.delete(item.id)
    }

    @ApiBearerAuth('access-token')
    @ApiResponse({ type: PaginationPostDto })
    @Get('/list/:page')
    async getPostList(@CtxUser() user: ContextUser, @Param("page") page: string | undefined): Promise<PaginationPostDto> {
        const friend = await this.friendService.findFriend(user.id)
        return this.postService.paginate([user.id, friend.id], 20, +page ?? 0)
    }

    @ApiBearerAuth('access-token')
    @Get('/last/friend')
    async getLastFriendPost(@CtxUser() user: ContextUser) {
        const friend = await this.friendService.findFriend(user.id)
        return this.postService.findOne(null, friend.id)
    }

    @ApiBearerAuth('access-token')
    @Get('/last')
    async getLast(@CtxUser() user: ContextUser) {
        return this.postService.findOne(null, user.id)
    }

    @ApiBearerAuth('access-token')
    @Post('/request/friend')
    async requestFriendMind(@CtxUser() user: ContextUser) {
        // todo : 일정 시간 텀으로 요청 or exception 뱉기
        this.notificationService.sendNotificationToFriend(user.id, new NotificationContent({
            type: "MIND.REQUEST",
            displayName: user.displayName
        }))
    }

    @ApiBearerAuth('access-token')
    @Get(':id')
    async getOneById(@CtxUser() user: ContextUser, @Param("id") id: string | undefined): Promise<MindPost | undefined> {
        const authorized = this.postService.authorize(user.id, { postId: +id })
        if (!authorized) throw new UnauthorizedException()
        return await this.postService.findOne(+id)
    }
}