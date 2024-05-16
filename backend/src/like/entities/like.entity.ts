import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";

enum Type {
    like = 'like', // 👍
    claps = 'claps', // 👏
    heart = 'heart', // ❤️
    smile = 'smile', // 😄
}

@Entity({ name: 'likes' })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ enum: Type, type: 'enum', default: Type.like })
    type: string;

    @ManyToOne(() => User, user => user.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, post => post.likes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
