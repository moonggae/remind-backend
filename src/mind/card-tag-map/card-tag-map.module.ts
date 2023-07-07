import { Module } from '@nestjs/common';
import { CardTagMapService } from './card-tag-map.service';
import { CardTagMapController } from './card-tag-map.controller';

@Module({
  controllers: [CardTagMapController],
  providers: [CardTagMapService]
})
export class CardTagMapModule {}
