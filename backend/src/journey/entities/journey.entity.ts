import { Superpower } from "../../superpower/entities/superpower.entity";
import { Tag } from "../../tag/entities/tag.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JourneyUser } from "./journey-user.entity";

@Entity({ name: 'journeys' })
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ length: 500, nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false, default: 0})
  nuts: number;

  @ManyToOne(() => User, user => user.journeys, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  creator: User;

  @OneToMany(() => JourneyUser, journeyUser => journeyUser.journey)
  users: JourneyUser[];

  @ManyToMany(() => Tag, tag => tag.journeys) 
  @JoinTable({ name: 'journeys_tags' })
  tags: Tag[];

  @ManyToMany(() => Superpower, Superpower => Superpower.journeys) 
  @JoinTable({ name: 'journeys_superpowers' })
  superpowers: Superpower[];
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}