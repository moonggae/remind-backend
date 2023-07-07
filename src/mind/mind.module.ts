import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindCard } from './card/entities/mind-card.entity';
import { MindTag } from './tag/entities/mind-tag.entity';
import { RouterModule } from '@nestjs/core';
import { CardTagMapModule } from './card-tag-map/card-tag-map.module';
import { CardTagMap } from './card-tag-map/entities/card-tag-map.entity';

@Module({
  imports: [
    CardModule, 
    TagModule,
    CardTagMapModule,

    TypeOrmModule.forFeature([
      MindCard, 
      MindTag,
      CardTagMap
    ]),

    RouterModule.register([{
      path: 'mind', children: [
        { module: CardModule, path: '/' },
        { module: TagModule, path: '/' }
      ]
    }])]
})
export class MindModule { }
