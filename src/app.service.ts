import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';

export interface UserInterface {
  id?:number,
  firstName: string,
  lastName: string,
  birthdayDate: string,
  timeZone:string,
  email:string,
  message:string,
  status?:string
}
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}

  create(user: UserInterface): Promise<UserInterface> { 
    return this.userRepository.save(
      this.userRepository.create(user)
    );
  }

  findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }

  update(id: string, data: any): Promise<any> {
    return this.userRepository
    .createQueryBuilder()
    .update()
    .set({
      firstName:data.firstName,
      lastName:data.lastName,
      birthdayDate:data.birthdayDate,
      timeZone:data.timeZone,
      email:data.email,
      message:data.message,
      status:data.status
    })
    .where('id = :id', { id })
    .execute()
  }

  delete(id: string): Promise<any> {
    return this.userRepository
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute()
  }
  sendEmail(email:string,message:string):boolean{
    // this should smtp function, but dont have smtp
    const number = Math.floor(Math.random() * 10);
    return number % 2 === 0
  }
  getHello(): string {
    return 'Hello World!';
  }
}
