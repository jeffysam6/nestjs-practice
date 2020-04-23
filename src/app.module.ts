import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { AdminsController } from './admins/admins.controller';
// import { AdminsModule } from './admins/admins.module';
// import { AdminsService } from './admins/admins.service';
// import { IdeaModule } from './idea/idea.module';




@Module({
imports : [TypeOrmModule.forRoot(),UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
