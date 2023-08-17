import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateMindPostDto } from './dto/create-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { MindPost } from './entities/mind-post.entity';
import { UpdateMindPostDto } from './dto/update-post.dto';

@Controller('')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth('access-token')
  @Post()
  async create(@CtxUser() user: ContextUser, @Body() createDto: CreateMindPostDto): Promise<MindPost> {
    return await this.postService.create(user.id, createDto);
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(@CtxUser() user: ContextUser, @Param('id') id: String, @Body() updateDto: UpdateMindPostDto): Promise<MindPost> {
    const item = await this.postService.findOne(+id, user.id)

    if(!item) {
      throw new UnauthorizedException()
    }

    return this.postService.update(item.id, updateDto)
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  async delete(@CtxUser() user: ContextUser, @Param('id') id: String) {
    const item = await this.postService.findOne(+id, user.id)

    if(!item) {
      throw new UnauthorizedException()
    }

    return this.postService.delete(item.id)
  }

  @ApiBearerAuth('access-token')
  @Get('/last')
  async getLast(@CtxUser() user: ContextUser) {
    return this.postService.findOne(null, user.id)
  }
}