import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPostCard } from "./mind-post-card.entity";
import { MindPostMemo } from "../memo/entities/mind-post-memo.entity";
import { MindPostImage } from "./mind-post-image.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";

@Entity('mind_post')
export class MindPost extends CreatedAt(DeletedAt(EmptyClass)) {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false, cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => MindPostCard, card => card.post, { cascade: true })
    cards: MindPostCard[];

    @OneToMany(() => MindPostImage, image => image.post, { cascade: true })
    images: MindPostImage[];

    @OneToOne(() => MindPostMemo, { nullable: true, cascade: true })
    @JoinColumn({ name: 'memo_id' })
    memo: MindPostMemo;
}