import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class ReadReceivedFriendRequestDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ type: User })
    requestUser: User
}