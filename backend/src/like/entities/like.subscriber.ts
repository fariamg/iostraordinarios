import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Repository, RemoveEvent} from 'typeorm'
import { Like } from './like.entity';
import { Publish } from 'src/publish/entities/publish.entity';

@EventSubscriber()
export class LikeSubscriber implements EntitySubscriberInterface<Like> {

    listenTo() {
        return Like;
    }
    
    async afterInsert(event: InsertEvent<Like>) {
        const publishRep: Repository<Publish> = event.connection.manager.getRepository<Publish>('publishes');
        const likeRep: Repository<Like> = event.connection.manager.getRepository<Like>('likes');

        likeRep.count({ where: { publish: { id: event.entity.publish.id }}})
        .then((count: number) => {
            publishRep.update({id: event.entity.publish.id}, {likesCount: count})
        });
    }

    async afterRemove(event: RemoveEvent<Like>) {
        const publishRep: Repository<Publish> = event.connection.manager.getRepository<Publish>('publishes');
        const likeRep: Repository<Like> = event.connection.manager.getRepository<Like>('likes');

        likeRep.count({ where: { publish: { id: event.entity.publish.id }}})
        .then((count: number) => {
            publishRep.update({id: event.entity.publish.id}, {likesCount: count})
        });
    }
}