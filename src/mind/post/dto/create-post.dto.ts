import { ApiProperty } from "@nestjs/swagger";
import { MIND_POST_CARD_TYPE } from "../entities/mind-post-card.entity"

export class CreateMindPostDto {
    @ApiProperty({ example: [{ id: 0, type: "string" }] })
    cards: [{
        id: number,
        type: MIND_POST_CARD_TYPE
    }];

    @ApiProperty()
    images: string[];

    @ApiProperty({ nullable: true })
    memo?: string;
}