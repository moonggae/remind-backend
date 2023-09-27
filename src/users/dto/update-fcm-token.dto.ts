import { ApiProperty } from "@nestjs/swagger";

export class UpdateFCMTokenDto {
    @ApiProperty()
    token: string
}