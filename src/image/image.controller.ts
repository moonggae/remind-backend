import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import type { Response } from 'express';
import { Public } from 'src/common/dacorator/public.decorator';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Public()
  @Get(':id')
  async downloadImage(@Res() res: Response, @Param('id') id: string) {
     const entity = await this.imageService.findOne(id)
     const fileStream = this.imageService.findFile(entity.fileName)

     res.set({
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `attachment; filename="${entity.fileName}"`,
     })

     fileStream.pipe(res)
  }
}