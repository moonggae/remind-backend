import { MindCard } from "src/mind/card/entities/mind-card.entity";
import { MindTag } from "src/mind/tag/entities/mind-tag.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CardTagMap {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MindCard, (card) => card, {nullable: false})
    @JoinColumn({name: 'mind_card_id'})
    card: MindCard

    @ManyToOne(() => MindTag, (tag) => tag, {nullable: false})
    @JoinColumn({name: 'mind_tag_id'})
    tag: MindTag

    @Column('double', {nullable: true})
    indicator?: number
}