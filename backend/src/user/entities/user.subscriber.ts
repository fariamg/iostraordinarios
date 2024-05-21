import { EventSubscriber, EntitySubscriberInterface, UpdateEvent} from 'typeorm';
import { User } from './user.entity';
import { Superpower } from '../../superpower/entities/superpower.entity';
import { Repository } from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }
    
    async afterUpdate(event: UpdateEvent<User>) {
        const userRep: Repository<User> = event.connection.manager.getRepository<User>('users');
        const superpowerRep: Repository<Superpower> = event.connection.manager.getRepository<Superpower>('superpowers');
        
        const result = await userRep.createQueryBuilder('users')
            .select('SUM(users.score)', 'totalScore')
            .where('users.superpowerId = :superpowerId', { superpowerId: event.entity.superpower.id })
            .getRawOne();

        await superpowerRep.update({ id: event.entity.superpower.id }, { totalScore: result.totalScore });
    }
}