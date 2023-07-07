import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MindTag {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column('varchar', {nullable: false, length: 20})
    name: string;

    @ApiProperty()
    @Column('varchar', {nullable: false, length: 20, name: 'display_name'})
    displayName: string;

    @ApiProperty()
    @Column('varchar', {nullable: true, length: 400})
    description: string;
}