import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { likeFeeling } from "src/@common/enums/like-feeling.enum";
@Entity({ name: 'likes' })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: likeFeeling, type: 'enum', default: likeFeeling.like })
    type: string;

    @ManyToOne(() => User, user => user.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    creator: User;

    @ManyToOne(() => Post, post => post.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    publish: Post;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
