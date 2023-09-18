import { ApiProperty } from "@nestjs/swagger";
import { Image } from "src/image/entities/image.entity";

class ReceivedUser {
    @ApiProperty()
    displayName: String;
    @ApiProperty()
    profileImage: Image;
    @ApiProperty()
    inviteCode: String;
}

export class ReadMyFriendRequestDto {
    @ApiProperty()
    id: number

    @ApiProperty({ type: ReceivedUser })
    receivedUser: {
        displayName: String,
        profileImage: Image,
        inviteCode: String
    }
}