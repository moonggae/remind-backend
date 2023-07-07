import { PartialType } from '@nestjs/swagger';
import { CreateCardTagMapDto } from './create-card-tag-map.dto';

export class UpdateCardTagMapDto extends PartialType(CreateCardTagMapDto) {}
