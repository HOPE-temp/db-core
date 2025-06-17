import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { Adoption } from './adoption.entity';

@Entity('adopters')
export class Adopter {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.adopter)
  evaluations: Evaluation[];

  @OneToMany(() => Adoption, (adoption) => adoption.adopter)
  adoptions: Adoption[];

  @Column({
    name: 'fisrt_name',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'document_number',
    unique: true,
    length: 20,
    nullable: false,
  })
  documentNumber: string;

  @Column({
    length: 20,
    nullable: false,
  })
  phone: string;

  @Column({
    length: 20,
    nullable: true,
  })
  district: string;

  @Column({
    name: 'is_banned',
    default: false,
  })
  isBanned: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
