import { Controller, Get } from '@nestjs/common';
import { CardService } from './card.service';
import { Public } from 'src/common/dacorator/public.decorator';

@Controller('')
export class CardController {
    constructor(private readonly cardService: CardService) { }

    @Public()
    @Get()
    findAll() {
        return this.cardService.findAll();
    }
}
