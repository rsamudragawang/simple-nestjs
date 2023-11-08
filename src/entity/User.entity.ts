import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    required: true,
  })
  @Column()
  firstName: string;
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'John@example.com',
    required: true,
  })
  @Column()
  email: string;
  @ApiProperty({
    example: 'HBD',
    required: true,
  })
  @Column()
  message: string;
  @ApiProperty({
    example: '01-01-2020',
    required: true,
  })
  @Column({ type: 'date' })
  birthdayDate: string;
  @ApiProperty({
    example: 'Asia/Jakarta',
    required: true,
  })
  @Column()
  timeZone: string;

  @Column({ nullable: true })
  status: string;
}
