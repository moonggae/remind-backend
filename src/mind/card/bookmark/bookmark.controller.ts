import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { MindCardBookmark } from './entities/mind-card-bookmark.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mind - Card - Bookmark')
@Controller('')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) { }

    @Get()
    async findAll(@CtxUser() user: ContextUser): Promise<MindCardBookmark[]> {
        return await this.bookmarkService.find(user.id)
    }

    @Post(":mindCardId")
    async postBookmark(@CtxUser() user: ContextUser, @Param("mindCardId") mindCardId: string) {
        await this.bookmarkService.create(user.id, +mindCardId)
    }

    @Delete(":mindCardId")
    async deleteBookmark(@CtxUser() user: ContextUser, @Param("mindCardId") mindCardId: string) {
        await this.bookmarkService.delete(user.id, +mindCardId)
    }
}