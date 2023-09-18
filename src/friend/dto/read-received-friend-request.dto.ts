import { ApiProperty } from "@nestjs/swagger";
import { Image } from "src/image/entities/image.entity";

class RequestUser {
    @ApiProperty()
    displayName: String;
    @ApiProperty()
    profileImage: Image;
    @ApiProperty()
    inviteCode: String;
}

export class ReadReceivedFriendRequestDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ type: RequestUser })
    requestUser: {
        displayName: String,
        profileImage: Image,
        inviteCode: String
    }
}