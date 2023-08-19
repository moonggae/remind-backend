import { PickType } from '@nestjs/swagger';
import { CreateMemoDto } from './create-memo.dto';

export class UpdateMemoDto extends PickType(CreateMemoDto, [ 'text' ] as const) {}
