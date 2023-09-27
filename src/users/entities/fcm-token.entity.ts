import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('user_fcm_token')
export class FCMToken extends CreatedAt(EmptyClass) {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'varchar', length: 255, nullable: false })
    token: string
}