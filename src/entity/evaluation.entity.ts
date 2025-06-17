import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adopter } from './adopter.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Adopter, (adopter) => adopter.evaluations, { cascade: true })
  @JoinColumn({ name: 'adopter_id' })
  adopter: Adopter;

  @Column({
    name: 'has_garden',
    type: 'boolean',
    default: false,
  })
  hasGarden: boolean;

  @Column({
    name: 'has_near_park',
    type: 'boolean',
    default: false,
  })
  hasNearPark: boolean;

  @Column({
    name: 'count_kids',
    type: 'int',
    default: 0,
  })
  countKids: number;

  @Column({
    name: 'count_dogs',
    type: 'int',
    default: 0,
  })
  countDogs: number;

  @Column({
    name: 'count_cats',
    type: 'int',
    default: 0,
  })
  countCats: number;

  @Column({
    name: 'count_other_pets',
    type: 'int',
    default: 0,
  })
  countOtherPets: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  comments: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
