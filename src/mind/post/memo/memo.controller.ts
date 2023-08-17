import { Controller, Get, Inject, Param, UnauthorizedException, forwardRef } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CtxUser } from 'src/common/dacorator/context-user.decorator';
import { PostService } from '../post.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('')
export class MemoController {
    constructor(
        private readonly memoService: MemoService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService
    ) { }

    @ApiBearerAuth('access-token')
    @Get(':id')
    async findOne(@CtxUser() user: ContextUser, @Param('id') id: string) {
        const authorized = await this.postService.authorize(user.id, { memoId: +id })
        if(!authorized) throw new UnauthorizedException()
        return this.memoService.findOne(+id)
    }
}
