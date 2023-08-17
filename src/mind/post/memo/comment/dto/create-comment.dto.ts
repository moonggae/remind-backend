import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    memoId: number

    @ApiProperty()
    text: string
}