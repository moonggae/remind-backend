import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDisplayNameDto } from './dto/update-user-display-name.dto';
import { User } from './entities/user.entity';
import { ReadUserDisplayNameDto } from './dto/read-user-display-name.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

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
}
