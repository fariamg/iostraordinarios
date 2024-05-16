import { Superpower } from "src/superpower/entities/superpower.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @ManyToMany(() => User, user => user.journeys)
  @JoinTable({ name: 'journeys_users' })
  users: User[];

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}