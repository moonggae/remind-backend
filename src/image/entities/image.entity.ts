import { DeletedAt } from "src/common/entity-base/deleted_at.abstract";
import { EmptyClass } from "src/common/entity-base/empty-class";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends DeletedAt(EmptyClass) {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, length: 40, name: 'file_name', unique: true })
    fileName: string;
}