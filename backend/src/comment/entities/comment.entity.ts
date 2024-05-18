import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity'; 

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  body: string;

  @ManyToOne(() => User, user => user.comments, { nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => Post, post => post.comments, { nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'post_id' })
  publish: Post;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}