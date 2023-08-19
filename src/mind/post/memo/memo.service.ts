import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MindPostMemo } from './entities/mind-post-memo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoService {
    constructor(@InjectRepository(MindPostMemo) private memoRepository: Repository<MindPostMemo>) {}

    async create(postId: number, text: string) {
        const createdMemo = await this.memoRepository.save({
            text: text,
            post: {
                id: postId
            }
        })

        return await this.findOne(createdMemo.id)
    }

    async update(id: number, text: string) {
        const updatedMemo = await this.memoRepository.save({
            id: id,
            text: text
        })

        return await this.findOne(updatedMemo.id)
    }

    async findOne(id: number) {
        return this.memoRepository.findOne({
            where: {
                id: id
            },
            relations: {
                comments: {
                    user: true,
                    likes: {
                        user: true,
                    }
                },
            }
        })
    }
}
