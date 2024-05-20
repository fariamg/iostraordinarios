import { Like } from "src/like/entities/like.entity";
import { Superpower } from "src/superpower/entities/superpower.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'publishes' })
export class Publish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ length: 500, nullable: false })
  description: string;

  @Column({ nullable: false, type: 'int', default: 0 })
  likesCount: number;

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

  @OneToMany(() => Like, like => like.publish)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.publish)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}