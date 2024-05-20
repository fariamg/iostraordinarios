import { Journey } from "../../journey/entities/journey.entity";
import { Publish } from "../../publish/entities/publish.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @ManyToMany(() => User, user => user.tags)
    users: User[];

    @ManyToMany(() => Publish, publish => publish.tags)
    publishes: Publish[];

    @ManyToMany(() => Journey, user => user.tags)
    journeys: Journey[];
}
