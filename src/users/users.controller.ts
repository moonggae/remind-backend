import { Controller, Get, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDisplayNameDto } from './dto/update-user-display-name.dto';
import { ReadUserDisplayNameDto } from './dto/read-user-display-name.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/user.entity';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';
import { Public } from 'src/common/dacorator/public.decorator';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

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
    async getProfile(@CtxUser() user: ContextUser): Promise<User> {
        const userEntity = await this.usersService.findOneById(user.id)
        return userEntity
    }

    @ApiBearerAuth('access-token')
    @Get(':id')
    async getUser(@CtxUser() user: ContextUser, @Param('id') id: string): Promise<User> {
        const userEntity = await this.usersService.findOneById(id)
        return userEntity
    }

    @ApiBearerAuth('access-token')
    @Get('inviteCode/:inviteCode')
    async getUserByInviteCode(@Param('inviteCode') inviteCode: string): Promise<User> {
        const user = await this.usersService.findByInviteCode(inviteCode)
        return user
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

    // @Public()
    @ApiBearerAuth('access-token')
    @Delete(':loginType')
    async deleteUser(@CtxUser() user: ContextUser, @Param('loginType') loginType: LOGIN_TYPE) {
        if(loginType != LOGIN_TYPE.KAKAO) throw new NotFoundException()

        const userEntity = await this.usersService.findOneById(user?.id)
        if(!userEntity) throw new BadRequestException()

        const kakaoUnlinkDone = await this.usersService.unlinkKakaoUser(+userEntity.uid)
        if(!kakaoUnlinkDone) throw new BadRequestException()

        await this.usersService.deleteUser(user.id)
    }
}