import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AdoptedAnimal } from './adoptedAnimal.entity';

@Entity('activities')
export class Activity {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({ name: 'finished_by' })
  finisher: User;

  @ManyToOne(() => AdoptedAnimal, (adoptedAnimal) => adoptedAnimal.activities)
  @JoinColumn({ name: 'adopted_followup' })
  adoptedAnimal: AdoptedAnimal;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  imageUrl: string;

  @Column({
    name: 'resource_url',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  resourceUrl: string;

  @Column({
    name: 'schedule_start_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleStartAt: Date;

  @Column({
    name: 'schedule_end_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleEndAt: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  finished: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
