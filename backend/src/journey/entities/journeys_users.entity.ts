import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { Journey } from './journey.entity';
import { User } from '../../user/entities/user.entity';

@Entity('journeys_users')
export class JourneyUser {
  @PrimaryColumn()
  journeysId: number;

  @PrimaryColumn()
  UsersID: number;

  @ManyToOne(() => Journey, journey => journey.users)
  @JoinColumn({ name: 'journeysId' })
  journey: Journey;

  @ManyToOne(() => User, user => user.journeys)
  @JoinColumn({ name: 'UsersID' })
  user: User;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  completedAt: Date;
}
