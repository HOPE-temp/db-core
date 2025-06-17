import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  StatusRequestApotion,
  StatusResultApotion,
} from '../models/adoption.status.model';
import { Adopter } from './adopter.entity';
import { Animal } from './animal.entity';
import { AdoptedAnimal } from './adoptedAnimal.entity';
import { User } from './user.entity';

@Entity('adoptions')
export class Adoption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Adopter, (adopter) => adopter.adoptions, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'adopter_id' })
  adopter: Adopter;

  @ManyToOne(() => User, (user) => user.adopitons, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'evaluated_by_id' })
  evaluator: User;

  @OneToMany(() => AdoptedAnimal, (adoptedAnimal) => adoptedAnimal.adoptions)
  adoptedAnimals: AdoptedAnimal[];

  @ManyToMany(() => Animal, (animal) => animal.adoptionsTemp)
  @JoinTable({ name: 'selected_animals_temp' })
  animalsTemp: Animal[];

  @Column({
    name: 'status_result',
    type: 'enum',
    enum: StatusResultApotion,
    default: StatusResultApotion.NOT_EVALUATED,
    nullable: false,
  })
  statusResult: StatusResultApotion;

  @Column({
    name: 'status_request',
    type: 'enum',
    enum: StatusRequestApotion,
    default: StatusRequestApotion.CREATED,
    nullable: false,
  })
  statusRequest: StatusRequestApotion;

  @Column({
    name: 'review_request_notes',
    type: 'text',
    nullable: true,
  })
  reviewRequestNotes?: string;

  @Column({
    name: 'review_request_at',
    type: 'datetime',
    nullable: true,
  })
  reviewRequestAt?: Date;

  @Column({
    name: 'selected_animal_at',
    type: 'datetime',
    nullable: true,
  })
  selectedAnimalAt?: Date;

  @Column({
    name: 'contract_signed',
    type: 'boolean',
    default: false,
  })
  contractSigned: boolean;

  @Column({
    name: 'is_web_visible',
    type: 'boolean',
    default: false,
  })
  isWebVisible: boolean;

  @Column({
    name: 'adoption_history',
    type: 'text',
    nullable: true,
  })
  adoptionHistory?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
