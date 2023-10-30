import { Controller, Post, Body, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from '../../post.service';
import { FriendService } from 'src/friend/friend.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationContent } from 'src/notification/models/notification-content';
import { SocketService } from 'src/socket/socket.service';

@Controller('')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly friendService: FriendService,
        private readonly notificationService: NotificationService,
        private readonly socketService: SocketService
    ) { }

    @ApiBearerAuth('access-token')
    @Post()
    async create(@CtxUser() user: ContextUser, @Body() createCommentDto: CreateCommentDto) {
        let authorized = await this.postService.authorize(user.id, { memoId: createCommentDto.memoId })
        if (!authorized) authorized = await this.friendService.postAuthorize(user.id, { memoId: createCommentDto.memoId })
        if (!authorized) throw new UnauthorizedException()
        const comment = await this.commentService.create(user.id, createCommentDto.memoId, createCommentDto.text)

        this.notificationService.sendNotificationToFriend(user.id, new NotificationContent({
            type: "MEMO.COMMENT",
            targetId: `${comment.memo.id}`,
            displayName: user.displayName
        }))

        this.socketService.pushToFriend(user.id, "mind-memo-comment", comment)

        return comment
    }
}