import {Entity,Column,PrimaryGeneratedColumn } from 'typeorm';



@Entity('user')
export class UserEntity {
	
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column("text")
	username: string;

	@Column("text")
	password: string;
}