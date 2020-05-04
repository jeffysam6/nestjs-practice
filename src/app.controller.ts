import {Controller, Get,Post,UseInterceptors,UploadedFiles, Param, Res,HttpStatus,Logger} from '@nestjs/common';
import { FilesInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { AppService } from './app.service';
import { UserService } from './user/user.service';
var path = require('path')

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService,private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(":id")
  @UseInterceptors(
    FilesInterceptor('image',20,{
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, '../frontend/blog-frontend2/src/assets/')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
      })
    }))
  uploadFile(@Res() res,@Param('id') id ,@UploadedFiles() file) {
  //   console.log(file)
  //   return res.status(HttpStatus.OK).json({
  //     message: "FIle has been successful",
  //     file:file
  // });
    const image =  this.userService.upload(id, file[0])
    return res.status(HttpStatus.OK).json({
          file:file[0]
      });
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res){
    return res.sendFile(image,{root:'uploads'})
  }
}
