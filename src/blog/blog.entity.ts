import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, AfterInsert } from 'typeorm';
import {LogEntity} from '../logs/logs.entity'
import { type } from 'os';
import {InjectRepository,} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {getConnection} from "typeorm";


@Entity('blog')
export class BlogEntity {


    @PrimaryGeneratedColumn('uuid')
	id: number;
	
    @Column("text")
    title: string;
    
    @Column("text")
    description: string;


    @Column("text")
    authorId: string;

    @AfterInsert()
    async insertLog() {

        const  data = {
            postId : this.id,
            date_posted : new Date().toLocaleDateString()
        }
        console.log("a blog is inserted",this.title)

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(LogEntity)
            .values([
                data
            ])
            .execute();

        // const newpost = await this.logRepository.create(data);
        // await this.logRepository.save(newpost);
    }
    
    
	// @ManyToOne((type) => UserEntity,user=>user.id)
	// author: number;

    
}