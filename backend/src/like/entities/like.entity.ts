import { User } from '../../user/entities/user.entity';
import { Publish } from '../../publish/entities/publish.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { LikeFeeling } from '../../@common/enums/like-feeling.enum';

@Entity({ name: 'likes' })
@Unique(['creator', 'publish'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LikeFeeling, type: 'enum', default: LikeFeeling.like })
  type: string;

  @ManyToOne(() => User, (user) => user.likes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  creator: User;

  @ManyToOne(() => Publish, (publish) => publish.likes, {
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
