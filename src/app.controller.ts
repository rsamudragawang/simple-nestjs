import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AppService,UserInterface } from './app.service';
import { Request } from 'express';
import { Cron } from '@nestjs/schedule';
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post()
  async create(@Body() createUserDto: UserInterface) {
    const user = await this.appService.create(createUserDto);
    if(!user) {
      return {status:500,message:'Error Create User'}
    }
    return {status:200,message:'Success Create User'}
  }

  @Get()
  async findAll(@Req() request: Request) {
    const user: Array<UserInterface> = await this.appService.findAll()
    return {status:200,data:user}
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const update: any = await this.appService.update(id, body)
    return {status:200,message:'Success Update User'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.appService.delete(id)
    return {status:200,message:'Success Delete User'}
  }
  @Cron( '0 * * * * *' )
  async cornJob()  {
    const user: Array<UserInterface> = await this.appService.findAll()
    // this can use kafka, but i can't due to not using daily driver laptop
    user.map((val)=>{
      const birthdayDate = val.birthdayDate
      const birthDay = birthdayDate.split('-')[2]
      const birthMonth = birthdayDate.split('-')[1]
      const getTimeZone = new Date().toLocaleString('en-US',{timeZone:val.timeZone})
      const day = getTimeZone.split('/')[1]
      const month = getTimeZone.split('/')[0]///
      const getHour = new Date().toLocaleString('en-US',{timeZone:val.timeZone,timeStyle: 'short', hour12: false}).split(':')[0]
      
      const status = val.status === null || val.status === 'error'
      if(birthDay === day && month === birthMonth && status && getHour === '09'){
        console.log("send email",val.firstName)
        const isSuccess = this.appService.sendEmail(val.email,val.message)
        this.appService.update(val.id?.toString(),{...val,status:isSuccess ? 'send':'error'})
      }
      if(val.status === 'send' && getHour !== '09'){
        this.appService.update(val.id?.toString(),{...val,status:null})

      }
    })
  }
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
