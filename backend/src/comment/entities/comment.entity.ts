import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Publish } from '../../publish/entities/publish.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  body: string;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => Publish, (publish) => publish.comments, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'publish_id' })
  publish: Publish;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
