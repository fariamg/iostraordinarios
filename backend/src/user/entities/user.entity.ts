import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import { Tribe } from 'src/tribe/entities/tribe.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'username', unique: true, nullable: false })
    username: string;

    @Column({ name:'password', nullable: false })
    password: string;

    @Column({ name:'email', unique: true })
    email: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @ManyToOne(() => Tribe, tribe => tribe.users)
    tribes: Tribe[];
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
