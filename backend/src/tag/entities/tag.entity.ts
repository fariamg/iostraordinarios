import { Journey } from "src/journey/entities/journey.entity";
import { Publish } from "src/publish/entities/publish.entity";
import { User } from "src/user/entities/user.entity";
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
