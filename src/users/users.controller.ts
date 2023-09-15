import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDisplayNameDto } from './dto/update-user-display-name.dto';
import { User } from './entities/user.entity';
import { ReadUserDisplayNameDto } from './dto/read-user-display-name.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ReadUserProfileDto } from './dto/read-user-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiBearerAuth('access-token')
    @Get('displayName')
    @ApiResponse({ type: ReadUserDisplayNameDto })
    async getDisplayName(@CtxUser() user: ContextUser): Promise<ReadUserDisplayNameDto> {
        const foundUser = await this.usersService.findOneById(user.id);
        const result = new ReadUserDisplayNameDto();
        result.displayName = foundUser.displayName;
        return result;
    }

    @ApiBearerAuth('access-token')
    @Patch('displayName')
    async updateDisplayName(@CtxUser() user: ContextUser, @Body() UpdateUserDisplayNameDto: UpdateUserDisplayNameDto) {
        await this.usersService.updateDisplayName(user.id, UpdateUserDisplayNameDto.displayName)
    }

    @ApiBearerAuth('access-token')
    @Get('profile')
    async getProfile(@CtxUser() user: ContextUser): Promise<ReadUserProfileDto> {
        const userEntity = await this.usersService.findOneById(user.id)
        return {
            displayName: userEntity.displayName,
            profileImage: userEntity.profileImage,
            inviteCode: userEntity.inviteCode
        }
    }

    @ApiBearerAuth('access-token')
    @Patch('profile')
    async updateProfile(@CtxUser() user: ContextUser, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        if(`${updateUserProfileDto.displayName}`.trim().length > 0) {
            await this.usersService.updateDisplayName(user.id, updateUserProfileDto.displayName)
        }
        if(`${updateUserProfileDto.profileImageId}`.trim().length > 0) {
            await this.usersService.updateProfileImage(user.id, updateUserProfileDto.profileImageId)
        }
    }
}
