import { ApiProperty } from "@nestjs/swagger";
// import { LOGIN_TYPE } from "src/common/enum/login-type.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column('varchar', {unique: true, nullable: false, length: 255})
    uid: string;

    @ApiProperty()
    @Column({type: 'enum', enum: LOGIN_TYPE, nullable: false})
    loginType: LOGIN_TYPE;

    @ApiProperty({nullable: true})
    @Column('varchar', {nullable: true, length: 10})
    displayName?: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date
}