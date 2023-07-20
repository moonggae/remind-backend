import { Controller, Get, Post, Param, Res, UseInterceptors, UploadedFiles, BadRequestException, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import type { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':id')
  async downloadImage(@Res() res: Response, @Param('id') id: string) {
     const entity = await this.imageService.findOne(id)
     const fileStream = this.imageService.findFile(entity.fileName)

     res.set({
      'Content-Type': 'image/*',
      'Content-Disposition': `attachment; filename="${entity.fileName}"`,
     })

     fileStream.pipe(res)
  }

  @Post('')
  @UseInterceptors(FilesInterceptor('files', 8, {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const path = './file'
        if(!existsSync(path)) {
          mkdirSync(path, {recursive: true});
        }

        callback(null, path);
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now();
        const filename = `${uniqueSuffix}_${file.originalname}`
        callback(null, filename)
      }
    }),
    limits: {
      fileSize: 1024 * 1024 * 100,
      files: 8
    },

    fileFilter: (req, file, callback) => {
      const validFileType = file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'
      callback(validFileType ? null : new BadRequestException() , validFileType)
    },
  }))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    const images = await this.imageService.create(files.map(file => file.filename));
    return images;
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    await this.imageService.delete(id);
  }
}