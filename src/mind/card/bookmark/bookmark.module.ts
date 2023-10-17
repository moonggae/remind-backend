import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindCardBookmark } from './entities/mind-card-bookmark.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MindCardBookmark
        ])
    ],
    controllers: [BookmarkController],
    providers: [BookmarkService]
})
export class BookmarkModule { }
