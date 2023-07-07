import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Public } from 'src/common/dacorator/public.decorator';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Public()
  @Get()
  findAll() {
    return this.cardService.findAll();
  }
}
