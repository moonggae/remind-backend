import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MindCardBookmark } from './entities/mind-card-bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(MindCardBookmark) private bookmarkRepository: Repository<MindCardBookmark>
    ) {}

    async find(userId: string): Promise<MindCardBookmark[]> {
        return await this.bookmarkRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                mindCard: true
            }
        })
    }

    async create(userId: string, cardId: number) {
        await this.bookmarkRepository.save({
            mindCard: {
                id: cardId
            },
            user: {
                id: userId
            }
        })
    }

    async delete(userId: string, cardId: number) {
        await this.bookmarkRepository.delete({
            mindCard: {
                id: cardId
            },
            user: {
                id: userId
            }
        })
    }
}
