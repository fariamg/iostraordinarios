import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserRole } from 'src/@common/enums/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Tribe } from 'src/tribe/entities/tribe.entity';
import { Like } from 'src/like/entities/like.entity';
import { Journey } from 'src/journey/entities/journey.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'full_name', nullable: false })
    fullName: string;

    @Column({ name: 'password', nullable: false, select: false})
    password: string;

    @Column({ name: 'email', unique: true, nullable: false })
    email: string;

    @Column({ name: 'position', nullable: false })
    position: string;

    @Column({ type: 'enum', enum: UserRole, nullable: false, default: UserRole.USER })
    role: UserRole;

    @Column({ name: 'nuts', nullable: false, default: 0 })
    nuts: number;

    @ManyToMany(() => Tag, tag => tag.users, { eager: true })
    @JoinTable({
        name: 'users_tags',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
    })
    tags: Tag[];

    @OneToMany(() => Post, post => post.creator)
    posts: Post[];

    @OneToMany(() => Like, like => like.creator)
    likes: Like[];
    @OneToMany(() => Journey, journey => journey.creator)
    journeys: Journey[];

    @OneToOne(() => Superpower)
    @JoinColumn({ name: 'superpower_id' })
    superpower: Superpower;

    @ManyToOne(() => Tribe, tribe => tribe.users)
    tribes: Tribe[];

    @OneToMany(() => Comment, comment => comment.creator)
    comments: Comment[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
