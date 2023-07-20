import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPostCard } from "./mind-post-card.entity";
import { MindPostMemo } from "../memo/entities/mind-post-memo.entity";
import { MindPostImage } from "./mind-post-image.entity";

@Entity('mind_post')
export class MindPost {
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
    @JoinColumn({name: 'memo_id'})
    memo: MindPostMemo;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @DeleteDateColumn({ type:'timestamp', name: 'deleted_at'})
    deletedAt: Date
}