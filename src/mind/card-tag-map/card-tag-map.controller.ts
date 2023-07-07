import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardTagMapService } from './card-tag-map.service';
import { CreateCardTagMapDto } from './dto/create-card-tag-map.dto';
import { UpdateCardTagMapDto } from './dto/update-card-tag-map.dto';

@Controller('card-tag-map')
export class CardTagMapController {
  constructor(private readonly cardTagMapService: CardTagMapService) {}


}
