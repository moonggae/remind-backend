import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { Image } from "src/image/entities/image.entity";
import { Column, CreateDateColumn, Entity, FindOptionsRelations, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum LOGIN_TYPE {
    KAKAO = 'KAKAO',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE'
}

@Entity()
export class User extends DeletedAt(EmptyClass) {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('varchar', { unique: false, nullable: false, length: 255 })
    uid: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    @ApiProperty()
    @Column({ type: 'enum', enum: LOGIN_TYPE, nullable: false })
    @Exclude({ toPlainOnly: true })
    loginType: LOGIN_TYPE;

    @ApiProperty({ nullable: true })
    @Column('varchar', { nullable: true, length: 10 })
    displayName?: string;

    @ApiProperty()
    @ManyToOne(() => Image, (image) => image?.id, { nullable: true })
    @JoinColumn({ name: 'profile_image_id' })
    profileImage?: Image;

    @ApiProperty()
    @Column('char', { nullable: false, length: 6 })
    inviteCode: string;

    static relation: FindOptionsRelations<User> = {
        profileImage: true
    }
}