import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MindPostMemoComment } from './entities/mind-post-memo-comment.entity';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(MindPostMemoComment) private commentRepository: Repository<MindPostMemoComment>) {}
    async create(userId: string, memoId: number, text: string) {
        const createdComment = await this.commentRepository.save({
            memo: {
                id: memoId
            },
            user: {
                id: userId
            },
            text: text
        })

        return this.findOne(createdComment.id)
    }

    async findOne(id: number) {
        return await this.commentRepository.findOne({
            where: {
                id: id
            },
            relations: {
                likes: {
                    user: true,
                },
                user: true,
                memo: true
            }
        })
    }
}