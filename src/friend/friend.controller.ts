import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { FriendService } from './friend.service';
import { UsersService } from 'src/users/users.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { FriendRequest } from './entities/friend.request.entity';
import { ReadReceivedFriendRequestDto } from './dto/read-received-friend-request.dto';
import { ReadMyFriendRequestDto } from './dto/read-my-friend-request.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationContent } from 'src/notification/models/notification-content';
import { User } from 'src/users/entities/user.entity';
import { SocketService } from 'src/socket/socket.service';
import { SOCKET_EVENT } from 'src/common/enum/socket-event.enum';

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
    constructor(
        @Inject(forwardRef(() => FriendService))
        private readonly friendService: FriendService,
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly notificationService: NotificationService,
        private readonly socketService: SocketService
    ) { }

    @ApiBearerAuth('access-token')
    @Get('')
    async findFriend(@CtxUser() user: ContextUser): Promise<User> {
        const friend = await this.friendService.findFriend(user.id)
        return friend
    }

    @ApiBearerAuth('access-token')
    @Post('request/:inviteCode')
    async requestFriend(@CtxUser() user: ContextUser, @Param('inviteCode') inviteCode: string) {
        const receiveUser = await this.userService.findByInviteCode(inviteCode)
        if (!receiveUser) {
            throw new NotFoundException()
        }

        const prevRequest = await this.friendService.findRequests(user.id)
        const conflictRequest = prevRequest.some(request => {
            return request.receiveUser.inviteCode == inviteCode
        })
        if(conflictRequest) {
            throw new ConflictException('conflict request')
        }

        const friends = await this.friendService.findFriends(user.id)
        const conflictFriend = friends.some(friend => {
            friend.inviteCode == inviteCode
        })
        if(conflictFriend) {
            throw new ConflictException('conflict friend')
        }

        await this.friendService.createRequest(
            user.id,
            receiveUser.id
        )

        this.notificationService.sendNotificationToUser(receiveUser.id, new NotificationContent({
            type: "FRIEND.REQUEST",
            displayName: user.displayName
        }))
    }

    @ApiBearerAuth('access-token')
    @ApiResponse({ type: [ReadReceivedFriendRequestDto] })
    @Get('requests')
    async findFriendRequests(@CtxUser() user: ContextUser): Promise<ReadReceivedFriendRequestDto[]> {
        const requests: FriendRequest[] = await this.friendService.findReceivedRequests(user.id)
        return requests.map(request => {
            return {
                id: request.id,
                requestUser: request.requestUser
            }
        })
    }

    @ApiBearerAuth('access-token')
    @ApiResponse({ type: [ReadMyFriendRequestDto] })
    @Get('myRequests')
    async findMyFriendRequests(@CtxUser() user: ContextUser): Promise<ReadMyFriendRequestDto[]> {
        const requests: FriendRequest[] = await this.friendService.findRequests(user.id)
        return requests.map(request => {
            return {
                id: request.id,
                receivedUser: request.receiveUser
            }
        })
    }

    @ApiBearerAuth('access-token')
    @Delete('request/:requestId')
    async deleteMyFriendRequest(@CtxUser() user: ContextUser, @Param('requestId') requestId: string) {
        const requests = await this.friendService.findRequests(user.id);
        const existsRequest = requests.some(request => request.id == +requestId)
        if(!existsRequest) {
            throw new NotFoundException();
        }
        await this.friendService.deleteRequest(+requestId)
    }

    @ApiBearerAuth('access-token')
    @Post('accept/:requestId')
    async acceptFriendRequest(@CtxUser() user: ContextUser, @Param('requestId') requestId: string) {
        const request: FriendRequest = await this.friendService.findValidReceivedRequests(user.id, +requestId)
        if(!request) {
            throw new BadRequestException();
        }
        await this.friendService.acceptRequest(+requestId);

        this.socketService.pushToUser(
            request.receiveUser.id,
            SOCKET_EVENT.FRIEND,
            request.requestUser
        )
        
        this.notificationService.sendNotificationToUser(request.requestUser.id, new NotificationContent({
            type: "FRIEND.ACCEPT",
            displayName: user.displayName
        }))
    }

    @ApiBearerAuth('access-token')
    @Post('deny/:requestId')
    async denyFriendRequest(@CtxUser() user: ContextUser, @Param('requestId') requestId: string) {
        const request: FriendRequest = await this.friendService.findValidReceivedRequests(user.id, +requestId)
        if(!request) {
            throw new BadRequestException();
        }
        await this.friendService.denyRequest(+requestId);
    }

    @ApiBearerAuth('access-token')
    @Delete('')
    async deleteFriend(@CtxUser() user: ContextUser) {
        const friend = await this.friendService.findFriend(user.id)
        const result = await this.friendService.deleteFriend(user.id)
        if(result == false) {
            throw new BadRequestException()
        }
        this.socketService.pushToUser(
            friend.id,
            SOCKET_EVENT.FRIEND,
            null
        )
    }
}
