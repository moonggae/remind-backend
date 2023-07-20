import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MindPostMemo } from "../../entities/mind-post-memo.entity";
import { User } from "src/users/entities/user.entity";
import { MindPostMemoCommentLike } from "../like/entities/mind-post-memo-comment-like.entity";

@Entity('mind_post_memo_comment')
export class MindPostMemoComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 1000, nullable: false })
    text: string;

    @ManyToOne(() => MindPostMemo, { nullable: false })
    @JoinColumn({ name: 'memo_id' })
    memo: MindPostMemo;

    @OneToMany(() => MindPostMemoCommentLike, like => like.comment)
    likes: MindPostMemoCommentLike[]

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ type:'timestamp', name: 'deleted_at'})
    deletedAt: Date
}