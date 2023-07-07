import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MindCard } from './entities/mind-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(@InjectRepository(MindCard) private cardRepository : Repository<MindCard>) {}

  async findAll() {
    return await this.cardRepository.find({
      relations: ['tags', 'tags.tag', 'imageFile']
    });
  }
}
