import { ApiProperty } from "@nestjs/swagger";
import { Image } from "src/image/entities/image.entity";
import { CardTagMap } from "src/mind/card-tag-map/entities/card-tag-map.entity";
import { MindTag } from "src/mind/tag/entities/mind-tag.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MindCard {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column('varchar', {nullable: false, length: 20, unique: true})
    name: string;

    @ApiProperty()
    @Column('varchar', {nullable: false, length: 20})
    displayName: string;

    @ApiProperty()
    @Column('varchar', {nullable: true, length: 400})
    description: string;

    @ApiProperty()
    @ManyToOne(() => Image, (image) => image?.id, { nullable: true })
    @JoinColumn({ name: 'image_id' })
    imageFile?: Image | null;

    @OneToMany(() => CardTagMap, (tag) => tag.card)
    tags: CardTagMap[]
}