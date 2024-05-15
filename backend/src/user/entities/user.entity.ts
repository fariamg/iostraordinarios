import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import { Superpower } from 'src/superpower/entities/superpower.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Tribe } from 'src/tribe/entities/tribe.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'full_name', nullable: false })
    fullName: string;

    @Column({ name:'password', nullable: false })
    password: string;

    @Column({ name:'email', unique: true, nullable: false })
    email: string;

    @Column({ name:'position', nullable: false })
    position: string;

    @Column({ type: 'enum', enum: UserRole, nullable: false, default: UserRole.USER })
    role: UserRole;

    @Column({ name:'nuts', nullable: false, default: 0 })
    nuts: number;

    @ManyToMany(() => Tag, tag => tag.users, { eager: true })
    @JoinTable({
        name: 'user_tags',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
    })
    tags: Tag[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToOne(() => Superpower)
    @JoinColumn({ name: 'superpower_id' })
    superpower: Superpower;

    @ManyToOne(() => Tribe, tribe => tribe.users)
    tribes: Tribe[];
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}
