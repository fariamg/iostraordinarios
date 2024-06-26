import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '../../@common/enums/user-role.enum';
import { Publish } from '../../publish/entities/publish.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Exclude } from 'class-transformer';
import { Like } from '../../like/entities/like.entity';
import { JourneyUser } from '../../journey/entities/journey-user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ name: 'password', nullable: false })
  @Exclude()
  password: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'position', nullable: false })
  position: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => Superpower, { eager: true })
  superpower: Superpower;

  @Column({ name: 'nuts', nullable: false, default: 0 })
  nuts: number;

  @Column({
    name: 'bio',
    type: 'text',
    default: 'Olá, estou usando o app Ioasys Journey',
  })
  bio: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'interactions_count', nullable: false, default: 0 })
  interactionsCount: number;

  @Column({ name: 'missions_completed', nullable: false, default: 0 })
  journeysCompleted: number;

  @Column({ name: 'score', nullable: false, default: 0 })
  score: number;

  @ManyToMany(() => Tag, (tag) => tag.users, { eager: true })
  @JoinTable({
    name: 'users_tags',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Like, (like) => like.creator)
  likes: Like[];

  @OneToMany(() => JourneyUser, (journeyUser) => journeyUser.user)
  journeys: JourneyUser[];

  @OneToMany(() => Publish, (publish) => publish.creator)
  publishes: Publish[];

  @Column({ name: 'publishes_count', nullable: false, default: 0 })
  publishesCount: number;

  @ManyToMany(() => Publish, (publish) => publish.savedBy, { eager: true })
  @JoinTable({
    name: 'saved_publishes',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'publish_id', referencedColumnName: 'id' },
  })
  savedPublishes: Publish[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;
}
