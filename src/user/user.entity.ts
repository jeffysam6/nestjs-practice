import {Entity,Column,PrimaryGeneratedColumn,PrimaryColumn,Generated,OneToMany } from 'typeorm';
import {BlogEntity} from '../blog/blog.entity'


@Entity('user')
export class UserEntity {
	
	// @Column('uuid')
	// id: number;

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, unique: true })
	username: string;

	@Column({ nullable: false})
	password: string;

	// @OneToMany(type=> BlogEntity,blog=>blog.id)
	// blogs : BlogEntity[];

	@Column({ nullable:true})
	image: string

    // @Column({
    //     type: "longblob"
    // })
    // image: Buffer
}