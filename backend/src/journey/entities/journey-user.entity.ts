import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Journey } from 'src/journey/entities/journey.entity';

@Entity('journeys_users')
export class JourneyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.journeys)
  user: User;

  @ManyToOne(() => Journey, journey => journey.users)
  journey: Journey;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;
}
