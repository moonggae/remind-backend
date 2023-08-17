import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MindPostMemoComment } from "../../entities/mind-post-memo-comment.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";

@Entity({ name: 'mind_post_memo_comment_like' })
@Unique([ 'user', 'comment' ])
export class MindPostMemoCommentLike extends CreatedAt(EmptyClass) {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => MindPostMemoComment, { nullable: false })
    @JoinColumn({ name: 'comment_id' })
    comment: MindPostMemoComment
}