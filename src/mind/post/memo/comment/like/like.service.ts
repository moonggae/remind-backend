import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MindPostMemoCommentLike } from './entities/mind-post-memo-comment-like.entity';

@Injectable()
export class LikeService {
    constructor(@InjectRepository(MindPostMemoCommentLike) private likeRepository: Repository<MindPostMemoCommentLike>) {}

    async create(commentId: number, userId: string) {
        const createdLike = await this.likeRepository.save({
            user: {
                id: userId
            },
            comment: {
                id: commentId
            }
        })

        return await this.findOne(createdLike.id)
    }

    async delete(id: number) {
        await this.likeRepository.delete({
            id: id
        })
    }

    async findOne(id: number) {
        return this.likeRepository.findOne({
            where: { id },
            relations: {
                comment: false,
                user: true,
            }
        })
    }
}
