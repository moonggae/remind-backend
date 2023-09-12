import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
    @ApiProperty({ nullable: true })
    displayName?: string;

    @ApiProperty({ nullable: true })
    profileImageId?: string;
}