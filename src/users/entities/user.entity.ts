import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Image } from "src/image/entities/image.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum LOGIN_TYPE {
    KAKAO = 'KAKAO',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('varchar', { unique: true, nullable: false, length: 255 })
    @Exclude({ toPlainOnly: true })
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
}