import { ApiProperty } from "@nestjs/swagger"
import { MindPost } from "../entities/mind-post.entity"

export class PaginationPostDto {
    @ApiProperty({ type: [MindPost] })
    data: MindPost[]

    @ApiProperty()
    page: number

    @ApiProperty()
    lastPage: number
}