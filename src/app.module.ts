import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { AdminsController } from './admins/admins.controller';
// import { AdminsModule } from './admins/admins.module';
// import { AdminsService } from './admins/admins.service';
// import { IdeaModule } from './idea/idea.module';
import { BlogModule } from './blog/blog.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';



@Module({
imports : [TypeOrmModule.forRoot(),UserModule, BlogModule,
          MulterModule.register({dest: './uploads'}),TypeOrmModule.forFeature([UserEntity])],
  controllers: [AppController],
  providers: [AppService,UserService],

})
export class AppModule {}
