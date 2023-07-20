import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MindPostMemoComment } from "../comment/entities/mind-post-memo-comment.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { UpdatedAt } from "src/common/entity-base/updated_at.abstract";

@Entity('mind_post_memo')
export class MindPostMemo extends CreatedAt(UpdatedAt(DeletedAt(EmptyClass))) {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 1000, nullable: false })
    text: string;

    @OneToMany(() => MindPostMemoComment, comment => comment.memo)
    comments: MindPostMemoComment[]
}