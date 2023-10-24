import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/User.entity';
import {devConfig} from './config/database.config'
@Module({
  imports: [TypeOrmModule.forRoot(devConfig),TypeOrmModule.forFeature([User]), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
