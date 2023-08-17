import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MindPostMemo } from './entities/mind-post-memo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoService {
    constructor(@InjectRepository(MindPostMemo) private memoRepository: Repository<MindPostMemo>) {}

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
