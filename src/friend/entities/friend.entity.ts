import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FriendRequest } from "./friend.request.entity";
import { CreatedAt } from "src/common/entity-base/created_at.abstract";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";

@Entity()
export class Friend extends CreatedAt(DeletedAt(EmptyClass)) {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FriendRequest, (request) => request.id, { nullable: false, cascade: true })
    @JoinColumn({ name: 'friend_request_id' })
    acceptedFriendRequest: FriendRequest;
}