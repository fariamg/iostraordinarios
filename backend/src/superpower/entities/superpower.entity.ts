import { Journey } from "src/journey/entities/journey.entity";
import { Publish } from "src/publish/entities/publish.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'superpowers' })
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @ManyToMany(() => Publish, publish => publish.superpowers)
  publishes: Publish[];

  @ManyToMany(() => Journey, journey => journey.superpowers)
  journeys: Journey[];
}
