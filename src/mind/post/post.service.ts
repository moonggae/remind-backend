import { Injectable } from '@nestjs/common';
import { CreateMindPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';
import { MindPost } from './entities/mind-post.entity';
import { MindPostCard } from './entities/mind-post-card.entity';
import { MindPostImage } from './entities/mind-post-image.entity';
import { MindPostMemo } from './memo/entities/mind-post-memo.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateMindPostDto } from './dto/update-post.dto';
import { AuthorizeOptions } from 'src/auth/entities/authorize-options';

const mindPostRelations: FindOptionsRelations<MindPost> = {
    cards: {
        card: {
            tags: {
                tag: true
            },
            imageFile: true,
        }
    },
    images: {
        image: true
    },
    memo: {
        comments: {
            user: true,
            likes: {
                user: true
            }
        }
    },
    user: {
        profileImage: true
    }
}

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

    async delete(id: number) {
        await this.postRepository.softDelete({ id })
    }

    async paginate(userIds: string[], offset: number, page: number) {
        const [posts, total] = await this.postRepository.findAndCount({
            where: userIds.map(id => ({ user: { id } })),
            relations: mindPostRelations,
            take: offset,
            skip: (page) * offset,
            order: { id: "DESC" }
        })

        return {
            data: posts,
            page: page,
            lastPage: Math.floor(total / offset)
        }
    }

    async findOne(id?: number, userId?: string) {
        return await this.postRepository.findOne({
            where: {
                id: id,
                user: {
                    id: userId
                }
            },
            relations: mindPostRelations,
            order: { id: 'DESC' }
        })
    }

    async authorize(
        userId: string,
        options?: AuthorizeOptions
    ): Promise<boolean> {
        const postEntity: MindPost | null = await this.postRepository.findOne({
            where: {
                id: options.postId,
                user: {
                    id: userId
                },
                memo: {
                    id: options.memoId,
                    comments: {
                        id: options.commentId,
                        likes: {
                            id: options.likeId
                        }
                    }
                }
            }
        })

        if (postEntity) {
            return true
        } else {
            return false
        }
    }
}