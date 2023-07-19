import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPostMemoComment } from "../../entities/mind-post-memo-comment.entity";

@Entity({ name: 'mind_post_memo_comment_like' })
export class MindPostMemoCommentLike {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => MindPostMemoComment, { nullable: false })
    @JoinColumn({ name: 'comment_id' })
    comment: MindPostMemoComment

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date
}