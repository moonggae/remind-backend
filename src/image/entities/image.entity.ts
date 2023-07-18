import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {nullable: false, length:40, name: 'file_name', unique: true})
    fileName: string;
}