import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FriendRequest extends CreatedAt(DeletedAt(EmptyClass)) {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'request_user_id' })
    requestUser: User;

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'receive_user_id' })
    receiveUser: User;
}