import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MindPost } from "../../entities/mind-post.entity";
import { MindPostMemoComment } from "../comment/entities/mind-post-memo-comment.entity";

@Entity('mind_post_memo')
export class MindPostMemo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 1000, nullable: false })
    text: string;

    @OneToMany(() => MindPostMemoComment, comment => comment.memo)
    comments: MindPostMemoComment[]

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ type:'timestamp', name: 'deleted_at'})
    deletedAt: Date
}