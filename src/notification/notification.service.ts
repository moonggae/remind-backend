import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import * as path from 'path';
import { FCMToken } from 'src/notification/entities/fcm-token.entity';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { NotificationOptions } from 'src/notification/entities/notification-options';
import { FriendService } from 'src/friend/friend.service';

@Injectable()
export class NotificationService implements OnModuleInit {
    constructor(
        @InjectRepository(FCMToken)
        private fcmRepository: Repository<FCMToken>,
        private friendService: FriendService
    ) { }

    private app: admin.app.App;


    onModuleInit() {
        this.app = admin.initializeApp({
            credential: admin.credential.cert(path.join(__dirname, "..", "..", "..", "secrets", "firebase-account-key.json"))
        })
    }

    async sendNotification(tokens: string[], options?: NotificationOptions) {
        const message: MulticastMessage = {
            tokens: tokens,
            notification: {
                title: options?.title ?? "",
                body: options?.text ?? "",
            },
            data: {
                route: options?.route ?? "",
                id: options?.id ?? ""
            }
        }

        const result = await this.app.messaging().sendEachForMulticast(message)
        result.responses.forEach((res, index) => {
            if(res.error?.code?.includes("registration-token-not-registered")) {
                this.deleteToken(tokens[index])
            }
        })
    }

    private async deleteToken(token) {
        await this.fcmRepository.delete({
            token: token
        })
    }

    async sendNotificationToFriend(userId: string, options?: NotificationOptions) {
        const friend = await this.friendService.findFriend(userId)
        const friendTokens = await this.findTokensByUserId(friend.id)

        this.sendNotification(friendTokens.map(fcm => fcm.token), options)
    }

    async findOneToken(token: string): Promise<FCMToken | undefined> {
        try {
            return await this.fcmRepository.findOneBy({ token })
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findTokensByUserId(userId: string): Promise<FCMToken[]> {
        try {
            return await this.fcmRepository.findBy({ user: { id: userId } })
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async createToken(userId: string, token: string) {
        await this.fcmRepository.insert({
            user: {
                id: userId
            },
            token: token
        })
    }
}