import { MindCard } from "src/mind/card/entities/mind-card.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {nullable: false, length:40, name: 'file_name', unique: true})
    fileName: string;

    @OneToOne(() => MindCard, mindCard => mindCard.imageFile)  
    mindCard: MindCard;
}