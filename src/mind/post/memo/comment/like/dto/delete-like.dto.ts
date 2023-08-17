import { ApiProperty } from "@nestjs/swagger";

export class DeleteLikeDto {
    @ApiProperty()
    commentId: number
}