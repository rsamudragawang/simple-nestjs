import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  message: string;

  @Column({type:'date'})
  birthdayDate: string;

  @Column()
  timeZone: string;
  @Column({ nullable: true  })
  status: string;
}