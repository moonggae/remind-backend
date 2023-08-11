import { Injectable } from '@nestjs/common';
import { CreateMindPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MindPost } from './entities/mind-post.entity';
import { MindCard } from '../card/entities/mind-card.entity';
import { MindPostCard } from './entities/mind-post-card.entity';
import { MindPostImage } from './entities/mind-post-image.entity';
import { MindPostMemo } from './memo/entities/mind-post-memo.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateMindPostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(MindPost) private postRepository: Repository<MindPost>) { }

    async create(userId: string, createDto: CreateMindPostDto): Promise<MindPost> {
        const user: DeepPartial<User> = { id: userId };
        const cards: DeepPartial<MindPostCard>[] = createDto.cards.map(card => ({ card: { id: card.id }, type: card.type }));
        const images: DeepPartial<MindPostImage>[] = createDto.images.map(imageId => ({ image: { id: imageId } }));
        const memo: DeepPartial<MindPostMemo> | null = createDto.memo != null ? { text: createDto.memo } : null;

        const createdPost = await this.postRepository.save({
            user: user,
            cards: cards,
            images: images,
            memo: memo,
        })
        return this.findOne(createdPost.id);
    }

    async update(id: number, updateDto: UpdateMindPostDto): Promise<MindPost> {
        const cards: DeepPartial<MindPostCard>[] = updateDto.cards.map(card => ({ card: { id: card.id }, type: card.type }));
        const images: DeepPartial<MindPostImage>[] = updateDto.images.map(imageId => ({ image: { id: imageId } }));
        const memo: DeepPartial<MindPostMemo> | null = updateDto.memo != null ? { text: updateDto.memo } : null;

        const updatedPost = await this.postRepository.save({
            id, cards, images, memo
        })

        return this.findOne(updatedPost.id);
    }

    async findOne(id: number, userId?: string) {
        return await this.postRepository.findOne({
            where: [ { id }, { user: { id: userId } } ],
            relations: [
                "cards",
                "cards.card",
                "cards.card.tags",
                "cards.card.tags.tag",
                "cards.card.imageFile",
                "images",
                "images.image",
                "memo",
                "memo.comments",
                "memo.comments.user",
                "memo.comments.likes",
                "memo.comments.likes.user"
            ],
        })
    }
}