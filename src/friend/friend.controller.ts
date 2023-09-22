import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { FriendService } from './friend.service';
import { UsersService } from 'src/users/users.service';
import { ReadUserProfileDto } from 'src/users/dto/read-user-profile.dto';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { FriendRequest } from './entities/friend.request.entity';
import { ReadReceivedFriendRequestDto } from './dto/read-received-friend-request.dto';
import { ReadMyFriendRequestDto } from './dto/read-my-friend-request.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
    constructor(
        private readonly friendService: FriendService,
        private readonly userService: UsersService
    ) { }

    @ApiBearerAuth('access-token')
    @ApiResponse({ type: ReadUserProfileDto })
    @Get('user/:inviteCode')
    async findUserProfileByInviteCode(@Param('inviteCode') inviteCode: string): Promise<ReadUserProfileDto> {
        const user = await this.userService.findByInviteCode(inviteCode)
        return {
            inviteCode: user.inviteCode,
            displayName: user.displayName,
            profileImage: user.profileImage
        }
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
    }

    @ApiBearerAuth('access-token')
    @ApiResponse({ type: [ReadReceivedFriendRequestDto] })
    @Get('requests')
    async findFriendRequests(@CtxUser() user: ContextUser): Promise<ReadReceivedFriendRequestDto[]> {
        const requests: FriendRequest[] = await this.friendService.findReceivedRequests(user.id)
        return requests.map(request => {
            return {
                id: request.id,
                requestUser: {
                    displayName: request.requestUser.displayName,
                    profileImage: request.requestUser.profileImage,
                    inviteCode: request.requestUser.inviteCode
                }
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
                receivedUser: {
                    displayName: request.receiveUser.displayName,
                    profileImage: request.receiveUser.profileImage,
                    inviteCode: request.receiveUser.inviteCode
                }
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
}
