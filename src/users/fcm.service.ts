import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FCMToken } from "./entities/fcm-token.entity";

@Injectable()
export class FCMService {
    constructor(@InjectRepository(FCMToken) private fcmRepository: Repository<FCMToken>) {}

    async findOne(token: string): Promise<FCMToken | undefined> {
        try {
            return await this.fcmRepository.findOneBy({token})    
        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    async create(userId: string, token: string) {
        await this.fcmRepository.insert({
            user: {
                id: userId
            },
            token: token
        })
    }
}