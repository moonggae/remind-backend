import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../post.service';
import { FriendService } from 'src/friend/friend.service';
import { NotificationService } from 'src/notification/notification.service';

@Controller('')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly friendService: FriendService,
        private readonly notificationService: NotificationService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createCommentDto: CreateCommentDto) {
        let authorized = await this.postService.authorize(user.id, { memoId: createCommentDto.memoId })
        if (!authorized) authorized = await this.friendService.postAuthorize(user.id, { memoId: createCommentDto.memoId })
        if (!authorized) throw new UnauthorizedException()
        const comment = await this.commentService.create(user.id, createCommentDto.memoId, createCommentDto.text)
        this.notificationService.sendNotificationToFriend(user.id, {
            text: `${user.displayName ? `${user.displayName}님이` : "친구가" } 새로운 메모 코멘트를 남겼어요.`,
            type: "MEMO.COMMENT",
            targetId: `${comment.memo.id}`
        })
        console.log(comment)
        return comment
    }
}