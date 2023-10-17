import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindCard } from './entities/mind-card.entity';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MindCard,
        ]),
        BookmarkModule
    ],
    controllers: [CardController],
    providers: [CardService]
})
export class CardModule { }
