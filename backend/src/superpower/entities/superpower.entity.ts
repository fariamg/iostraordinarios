import { Journey } from "../../journey/entities/journey.entity";
import { Publish } from "../../publish/entities/publish.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({ name: 'superpowers' })
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ default: 0})
  totalScore: number;

  @ManyToMany(() => Publish, publish => publish.superpowers)
  publishes: Publish[];

  @ManyToMany(() => Journey, journey => journey.superpowers)
  journeys: Journey[];

  @OneToMany(() => User, user => user.superpower)
  users: User[];
}
