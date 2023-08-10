import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CarsFileInterceptor extends FileInterceptor('image') {
  constructor() {
    super({
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const randomName = uuidv4();
          const extension = extname(file.originalname);
          callback(null, `${randomName}${extension}`);
        },
      }),
    });
  }
}
