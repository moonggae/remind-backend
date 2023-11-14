import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class ReadMyFriendRequestDto {
    @ApiProperty()
    id: number

    @ApiProperty({ type: User })
    receivedUser: User
}