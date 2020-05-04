import { Injectable,HttpException  } from '@nestjs/common';
// import {USERS} from '../mocks/user.mock';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { UserEntity } from './user.entity';
import {getRepository,getConnection} from "typeorm";


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

    async loginuser(data:any) {
      const users = await this.userRepository.find();
      for(let i=0;i<users.length;i++)
      {
        if(users[i]["username"] == data["username"] && users[i]["password"] == data["password"])
        {
          return true;
        }
      }
      return false;
    }

    async registeruser(data :any) {

        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }


    async read(id:string) {
		return await this.userRepository.findOne({where:{id}});

    }
    
    async destroy(id:string) {
		await this.userRepository.delete(id);
    }
    
    async update(id:string,data:any){
        await this.userRepository.update(id,data);
		return await this.userRepository.findOne({where: { id }});
    }

    public async setAvatar(id: number, avatarUrl: string){
      this.userRepository.update(id, {image: avatarUrl});
  }

    async upload(id,file:any):Promise<any> {
      await getConnection()
      .createQueryBuilder()
      .update(UserEntity)
      .set({ image: file })
      .where("id = :id", { id: id})
      .execute();
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
