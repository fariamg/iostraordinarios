import { User } from "src/user/entities/user.entity";
import { Publish } from "src/publish/entities/publish.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { LikeFeeling } from "src/@common/enums/like-feeling.enum";

@Entity({ name: 'likes' })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    //@Column({ type: 'int', nullable: false, default: 0})
    //publishId: number;

    @Column({ enum: LikeFeeling, type: 'enum', default: LikeFeeling.like })
    type: string;

    @ManyToOne(() => User, user => user.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    creator: User;

    @ManyToOne(() => Publish, publish => publish.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publish_id' })
    publish: Publish;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
