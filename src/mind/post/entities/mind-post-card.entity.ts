import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindPost } from "./mind-post.entity";
import { MindCard } from "src/mind/card/entities/mind-card.entity";

export enum MIND_POST_CARD_TYPE {
    MAIN = 'MAIN', 
    SUB = 'SUB'
}

@Entity('mind_post_card')
export class MindPostCard {
    @PrimaryGeneratedColumn()
    id: number;

    /*
    note
    orphanedRowAction: OneToMany 객체에서 삭제시 delete 설정 필요
    */
    @ManyToOne(() => MindPost, { nullable: false, orphanedRowAction: "delete" })
    @JoinColumn({ name: 'post_id' })
    post: MindPost;

    @ManyToOne(() => MindCard, { nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: MindCard;

    @Column({ type: 'enum', enum: MIND_POST_CARD_TYPE, nullable: false })
    type: MIND_POST_CARD_TYPE;
}