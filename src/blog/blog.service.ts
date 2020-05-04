import { Injectable} from '@nestjs/common';
import {InjectRepository,} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { BlogEntity } from './blog.entity';
import {getConnection} from "typeorm";


@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntity) 
        private blogRepository:Repository<BlogEntity>
        ) {}

    
        async getPosts() {
            return await this.blogRepository.find();

        }

        async getPost(id): Promise<any> {
            const post = await this.blogRepository.findByIds(id);
            return post;
        }

        async addPost(data):Promise<any> {
            const newpost = await this.blogRepository.create(data);
            await this.blogRepository.save(newpost);
            return newpost;
        }

        async update(id,data):Promise<any> {
             await getConnection()
            .createQueryBuilder()
            .update(BlogEntity)
            .set(data)
            .where("id = :id", { id: id })
            .execute();

            return  await this.blogRepository.findByIds(id);
           
            //  await this.blogRepository.update(id,data);
            //  return await this.blogRepository.findOne({where: { id }});
        }

        async delete(id) :Promise<any> {
            
           return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(BlogEntity)
            .where("id = :id", { id: id })
            .execute();

        //    const post =  await this.blogRepository.delete(id);
        //     return post;
        }
}
