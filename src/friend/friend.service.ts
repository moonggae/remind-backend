import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FriendRequest } from './entities/friend.request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthorizeOptions } from 'src/auth/entities/authorize-options';
import { PostService } from 'src/mind/post/post.service';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendRequest) private requestRepository: Repository<FriendRequest>,
        @InjectRepository(Friend) private friendRepository: Repository<Friend>,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
    ) {}

    async postAuthorize(userId: string, options?: AuthorizeOptions): Promise<boolean> {
        const friend = await this.findFriend(userId)
        return await this.postService.authorize(friend.id, options)
    }

    async findFriend(userId: string): Promise<User | null> {
        const friends = await this.findFriends(userId)
        if(friends.length < 1) {
            return null
        } else {
            return friends[0]
        }
    }

    async findFriends(userId: string): Promise<User[]> {
        const foundFirendEntities = await this.friendRepository.find({
            where: [
                {
                    acceptedFriendRequest: {
                        receiveUser: {
                            id: userId
                        },
                    },
                    deletedAt: IsNull()
                },
                {
                    acceptedFriendRequest: {
                        requestUser: {
                            id: userId
                        },
                    },
                    deletedAt: IsNull()
                }
            ],
            relations: {
                acceptedFriendRequest: {
                    receiveUser: {
                        profileImage: true
                    },
                    requestUser: {
                        profileImage: true
                    },
                }
            },
            withDeleted: true
        })

        const friendUsers = foundFirendEntities.map(friendEntity => {
            if(friendEntity.acceptedFriendRequest.receiveUser.id != userId) {
                return friendEntity.acceptedFriendRequest.receiveUser
            } else {
                return friendEntity.acceptedFriendRequest.requestUser
            }
        })

        return friendUsers
    }

    async createRequest(requestUserId: string, receiveUserId: string) {
        await this.requestRepository.save({
            requestUser: { id: requestUserId },
            receiveUser: { id: receiveUserId }
        })
    }

    async findReceivedRequests(userId: string): Promise<FriendRequest[]> {
        return await this.requestRepository.find({
            where: {
                receiveUser: {
                    id: userId
                }
            },
            relations: {
                requestUser: {
                    profileImage: true
                },
                receiveUser: true
            }
        })
    }

    async findRequests(userId: string): Promise<FriendRequest[]> {
        return await this.requestRepository.find({
            where: {
                requestUser: {
                    id: userId
                }
            },
            relations: {
                receiveUser: {
                    profileImage: true
                }
            }
        })
    }

    async findValidReceivedRequests(userId: string, requestId: number): Promise<FriendRequest | undefined> {
        const requests = await this.findReceivedRequests(userId)
        return requests.find(request => request.id === requestId)
    }

    async deleteRequest(requestId: number) {
        await this.requestRepository.softDelete({ id: requestId })
    }

    async acceptRequest(requestId: number) {
        await this.friendRepository.save({
            acceptedFriendRequest: { id: requestId }
        })

        await this.requestRepository.softDelete({
            id: requestId
        })
    }

    async denyRequest(requestId: number) {
        await this.requestRepository.softDelete({
            id: requestId
        })
    }
}