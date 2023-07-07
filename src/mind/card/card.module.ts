import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindCard } from './entities/mind-card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MindCard, 
    ]),
  ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
