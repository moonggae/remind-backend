import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPost } from "./mind-post.entity";

@Entity('mind_post_image')
export class MindPostImage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MindPost, { nullable: false })
    @JoinColumn({ name: 'post_id' })
    post: MindPost;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @DeleteDateColumn({ type:'timestamp', name: 'deleted_at'})
    deletedAt: Date
}