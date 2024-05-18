import { Superpower } from "src/superpower/entities/superpower.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Like } from "src/like/entities/like.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from 'src/comment/entities/comment.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ length: 500, nullable: false })
  description: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToMany(() => Tag, tag => tag.posts) 
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];

  @OneToMany(() => Like, like => like.post)
  likes: Like[];
  
  @ManyToMany(() => Superpower, superpower => superpower.posts) 
  @JoinTable({ name: 'posts_superpowers' })
  superpowers: Superpower[];

  @OneToMany(() => Comment, comment => comment.publish)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}