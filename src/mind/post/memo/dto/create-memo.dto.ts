import { ApiProperty } from "@nestjs/swagger";

export class CreateMemoDto {
    @ApiProperty()
    postId: number

    @ApiProperty()
    text: string
}