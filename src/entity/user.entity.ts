import 'reflect-metadata';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicUser } from './publicUser.entity';
import { PrivateUser } from './privateUser.entity';
import { Adoption } from './adoption.entity';
import { AdoptedAnimal } from './adoptedAnimal.entity';
import { Activity } from './activity.entity';
import { MedicalCheckup } from './medical-checkup.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PublicUser, (publicInfo) => publicInfo.user, {
    cascade: true,
  })
  publicInfo: PublicUser;

  @OneToOne(() => PrivateUser, (privateInfo) => privateInfo.user, {
    cascade: true,
  })
  privateInfo: PrivateUser;

  @OneToOne(() => Activity, (activity) => activity.finisher)
  activities: Activity[];

  @OneToMany(
    () => MedicalCheckup,
    (medicalCheckup) => medicalCheckup.veterinarian,
  )
  medicalCheckups: MedicalCheckup[];

  @OneToMany(() => Adoption, (adoption) => adoption.evaluator)
  adopitons: Adoption[];

  @OneToMany(() => AdoptedAnimal, (adoptedAnimal) => adoptedAnimal.supervisor)
  adoptedAnimals: AdoptedAnimal[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
