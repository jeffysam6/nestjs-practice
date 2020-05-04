import { Controller, Get, Res, Param, Post, Put, Body, Query, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service';
//import { UserLoginDTO } from './dto/user-login.dto';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import {userDTO} from './dto/create-book.dto'


@Controller('users')
export class UserController {

  constructor(private userservice: UserService) { }

  @Get()
  getusers() {
    return this.userservice.getusers();
  }

  @Get(':id')
  getuser(@Param('id') id: string) {
    return this.userservice.read(id);
  }

  @Post('login')
  login(@Body() data: any) {

    return this.userservice.loginuser(data);
  }


  @Post('register')
  register(@Body() userLoginDTO: any) {
    console.log(userLoginDTO);
    return this.userservice.registeruser(userLoginDTO);
  }

  @Delete(':id')
  destroyuser(@Param('id') id: string) {
    return this.userservice.destroy(id);
  }

  @Put(':id')
  changepassword(@Param('id') id: string, @Body() data: any) {
    return this.userservice.update(id, data)
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFiles() file) {
    console.log(file);
  }


  // @Get('avatars/:id')
  // async serveAvatar(@Param('id') id, @Res() res): Promise<any> {
  //   res.sendFile(id, { root: 'avatars' });
  // }

}
        // if(result)
        // {
        //     return "Successfully Registered!!"
        // }
        // else
        // {
        //     return "User with same username already in database"
        // }


    // @Post('login')
    // async login(@Query() params){
    //     const result = await this.userservice.loginuser(params.username,params.password);
    //     if(result)
    //     {
    //         return "Successfully logged in"
    //     }
    //     else
    //     {
    //         return "user not in database"
    //     }
    // }

    // @Put('forgotpassword')
    // async forgotpassword(@Body() userLoginDTO:UserLoginDTO){
    //     const result = await this.userservice.registeruser(id,userLoginDTO);
    //     if(result)
    //     {
    //         return "Password successfully changed"
    //     }
    //     else
    //     {
    //         return "username doesn't exist in database"
    //     }
    // }
