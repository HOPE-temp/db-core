import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusFollowupAdoptedAnimal } from '../models/followup.status.model';

import { Adoption } from './adoption.entity';
import { Animal } from './animal.entity';
import { User } from './user.entity';
import { Activity } from './activity.entity';

@Entity('adopted_animals')
export class AdoptedAnimal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Activity, (activity) => activity.adoptedAnimal)
  activities: Activity[];

  @ManyToOne(() => Adoption, (adoption) => adoption.adoptedAnimals)
  @JoinColumn({ name: 'adoption_id' })
  adoptions: Adoption;

  @ManyToOne(() => Animal, (animal) => animal.adoptedAnimals)
  @JoinColumn({ name: 'animal_id' })
  animals: Animal;

  @ManyToOne(() => User, (user) => user.adoptedAnimals)
  @JoinColumn({ name: 'supervised_by_id' })
  supervisor: User;

  @Column({
    name: 'status_followup',
    type: 'enum',
    enum: StatusFollowupAdoptedAnimal,
    default: StatusFollowupAdoptedAnimal.SCHEDULED_FOLLOUP,
    nullable: false,
  })
  statusFollowup: StatusFollowupAdoptedAnimal;

  @Column({
    name: 'is_returned',
    type: 'boolean',
    default: false,
  })
  isReturned: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
