import { Superpower } from "src/superpower/entities/superpower.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'publishes' })
export class Publish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ length: 500, nullable: false })
  description: string;

  @ManyToOne(() => User, user => user.publishes, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToMany(() => User, user => user.savedPublishes)
  savedBy: User[];

  @ManyToMany(() => Tag, tag => tag.publishes)
  @JoinTable({ name: 'publishes_tags' })
  tags: Tag[];

  @ManyToMany(() => Superpower, superpower => superpower.publishes)
  @JoinTable({ name: 'publishes_superpowers' })
  superpowers: Superpower[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}