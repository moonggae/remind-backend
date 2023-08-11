import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPost } from "./mind-post.entity";
import { Image } from "src/image/entities/image.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";

@Entity('mind_post_image')
export class MindPostImage extends CreatedAt(DeletedAt(EmptyClass)) {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Image, { nullable: false, cascade: true })
    @JoinColumn({ name: 'image_id' })
    image: Image;

    @ManyToOne(() => MindPost, { nullable: false, orphanedRowAction: "delete" })
    @JoinColumn({ name: 'post_id' })
    post: MindPost;
}