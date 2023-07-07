import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) {}

  async findOne(id: string) {
    return await this.imageRepository.findOneBy({id})
  }

  findFile(fileName: string) : ReadStream {
    const fileDirectoryPath = join(__dirname, '..', '..','..', 'file', fileName);
    return createReadStream(fileDirectoryPath);
  }
}
