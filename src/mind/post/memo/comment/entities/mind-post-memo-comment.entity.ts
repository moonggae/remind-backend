import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MindPostMemo } from "../../entities/mind-post-memo.entity";
import { User } from "src/users/entities/user.entity";
import { MindPostMemoCommentLike } from "../like/entities/mind-post-memo-comment-like.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { UpdatedAt } from "src/common/entity-base/updated_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";

@Entity('mind_post_memo_comment')
export class MindPostMemoComment extends CreatedAt(UpdatedAt(DeletedAt(EmptyClass))) {
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
}