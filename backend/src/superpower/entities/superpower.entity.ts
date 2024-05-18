import { Journey } from "src/journey/entities/journey.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'superpowers' })
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @ManyToMany(() => Post, post => post.superpowers)
  posts: Post[];

  @ManyToMany(() => Journey, journey => journey.superpowers)
  journeys: Journey[];
}
