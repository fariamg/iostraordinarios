import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Journey } from 'src/journey/entities/journey.entity';

@Entity('journeys_users')
export class JourneyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.journeys)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Journey, journey => journey.users)
  @JoinColumn({ name: 'journey_id' })
  journey: Journey;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;
}
