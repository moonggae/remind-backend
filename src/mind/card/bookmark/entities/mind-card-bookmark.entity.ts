import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MindCard } from "../../entities/mind-card.entity";

@Entity("mind_card_bookmark")
export class MindCardBookmark extends CreatedAt(EmptyClass) {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => MindCard, (card) => card.id, { nullable: false })
    @JoinColumn({ name: "mind_card_id" })
    mindCard: MindCard
}