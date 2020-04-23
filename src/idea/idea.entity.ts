import {Entity,Column,PrimaryGeneratedColumn } from 'typeorm';


@Entity('idea')
export class IdeaEntity {

	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column("text",{nullable: true})
	idea: string;

	@Column("text",{nullable: true})
	description: string;
}