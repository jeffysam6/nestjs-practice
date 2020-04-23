import { Injectable,HttpException  } from '@nestjs/common';
// import {USERS} from '../mocks/user.mock';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { UserEntity } from './user.entity';


@Injectable()
export class UserService {

    constructor(
    @InjectRepository(UserEntity) 
    private userRepository:Repository<UserEntity>
    ) {}


    // users = USERS
    async getusers() {
        return await this.userRepository.find();

        }

    // async loginuser(username:string,password:string)
    // {
    //     return await this.userRepository.findOne({where : {username:username,password:password}})
    // }

    async registeruser(data :any) {

        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }


    async read(username:string) {
		return await this.userRepository.findOne({where:{username}});

    }
    
    async destroy(id:string) {
		await this.userRepository.delete(id);
    }
    
    async update(id:string,data:any){
        await this.userRepository.update(id,data);
		return await this.userRepository.findOne({where: { id }});
    }
    
    //     loginuser(username:string,password:string) : Promise<any> {
    //     var result = false 
    //     for(let i=0;i<this.users.length;i++)
    //     {
    //         if(this.users[i]["username"] == username)
    //         {
    //             result = true
    //         }
    //     }
    //     return new Promise(resolve => {
    //         resolve(result);
    //     });
    // }

    // async registeruser(data:any) {

    //     const user = await this.userRepository.create(data);
    //     await this.userRepository.save(user);
    //     return user;
    //}
    //  Promise<any> {
    //     var result = false 
    //     for(let i=0;i<this.users.length;i++)
    //     {
    //         if(this.users[i]["username"] == user["username"])
    //         {
    //             result = true
    //         }
    //     }

    //     if(result)
    //     {
    //     return new Promise(resolve => {
    //         resolve(false);
    //     });
    //     }
    //     else{
    //     return new Promise(resolve => {
    //             this.users.push(user)
    //             resolve(true);
    //         });
    //     }
    // } 

    // forgotpassword(id:string,data)
    // {
    //     await this.userRepository.update({id},data);
    //     return await this.userRepository.findOne({id});
    //} 
    // : Promise<any> {

    //     var result = false 
    //     for(let i=0;i<this.users.length;i++)
    //     {
    //         if(this.users[i]["username"] == user["username"])
    //         {
    //             result = true
    //             this.users[i]['password'] = user['password']
    //         }
    //     }

    //     if(result)
    //     {
    //     return new Promise(resolve => {
    //         resolve(result);
    //     });
    //     }
    //     else{
    //     return new Promise(resolve => {
    //             this.users.push(user)
    //             resolve(result);
    //         });
    //     }
    // }
}
