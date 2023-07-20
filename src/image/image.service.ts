import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) {}

  async create(fileNames: string[]) {
    const images : DeepPartial<Image>[] = fileNames.map(fileName => ({fileName}))
    return await this.imageRepository.save(images)
  }

  async findOne(id: string) {
    return await this.imageRepository.findOneBy({ id: id })
  }

  findFile(fileName: string) : ReadStream {
    const fileDirectoryPath = join(__dirname, '..', '..','..', 'file', fileName);
    return createReadStream(fileDirectoryPath);
  }

  async delete(id: string) {
    await this.imageRepository.softDelete({ id: id })
  }
}