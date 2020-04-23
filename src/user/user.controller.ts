import { Controller,Get,Param,Post,Put,Body,Query,Delete } from '@nestjs/common';
import {UserService} from './user.service';
//import { UserLoginDTO } from './dto/user-login.dto';
import { Request } from 'express';

// import {userDTO} from './dto/create-book.dto'


@Controller('users')
export class UserController {

    constructor(private userservice:UserService) {}

    @Get()
     getusers() {
        return  this.userservice.getusers();
    }

    @Get(':username')
    getuser(@Param('username') username:string) {
        return this.userservice.read(username);
    }


    @Post('register')
     register(@Body() userLoginDTO:any) {
        return  this.userservice.registeruser(userLoginDTO);
    }

    @Delete(':id')
	destroyuser(@Param('id') id:string){
		return this.userservice.destroy(id);
    }
    
    @Put(':id')
    changepassword(@Param('id') id:string,@Body() data:any){
        return this.userservice.update(id,data)
    }

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

     

