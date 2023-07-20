import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateMindPostDto } from './dto/create-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { MindPost } from './entities/mind-post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth('access-token')
  @Post()
  async create(@CtxUser() user: ContextUser, @Body() createDto: CreateMindPostDto) : Promise<MindPost> {
    return await this.postService.create(user.id, createDto);
  }
}