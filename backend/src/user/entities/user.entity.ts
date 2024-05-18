import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserRole } from 'src/@common/enums/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Journey } from 'src/journey/entities/journey.entity';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'full_name', nullable: false })
    fullName: string;

    @Column({ name: 'password', nullable: false })
    @Exclude()
    password: string;

    @Column({ name: 'email', unique: true, nullable: false })
    email: string;

    @Column({ name: 'position', nullable: false })
    position: string;

    @Column({ type: 'enum', enum: UserRole, nullable: false, default: UserRole.USER })
    role: UserRole;

    @ManyToOne(() => Superpower, { eager: true })
    superpower: Superpower;

    @Column({ name: 'nuts', nullable: false, default: 0 })
    nuts: number;

    @Column({ name: 'bio', type: 'text', default: 'Olá, estou usando o app Ioasys Journey'})
    bio: string;

    @Column({ name: 'avatar', nullable: true })
    avatar: string;

    @Column({ name: 'interactions_count', nullable: false, default: 0 })
    interactionsCount: number;

    @Column({ name: 'missions_completed', nullable: false, default: 0 })
    missionsCompleted: number;

    @Column({ name: 'score', nullable: false, default: 0 })
    score: number;

    @ManyToMany(() => Tag, tag => tag.users, { eager: true })
    @JoinTable({
        name: 'users_tags',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
    })
    tags: Tag[];

    @OneToMany(() => Journey, journey => journey.creator)
    journeys: Journey[];

    @OneToMany(() => Post, post => post.creator)
    posts: Post[];

    @ManyToMany(() => Post, post => post.savedBy, { eager: true })
    @JoinTable({
        name: 'saved_posts',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'post_id', referencedColumnName: 'id' }
    })
    savedPosts: Post[];

    @OneToMany(() => Comment, comment => comment.creator)
    comments: Comment[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
