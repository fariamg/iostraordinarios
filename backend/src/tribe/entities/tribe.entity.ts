import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'tribes' })
export class Tribe {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 500, nullable: false })
  name: string;
  
  @Column({ length: 500, nullable: false })
  description: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => User, user => user.tribes)
  @JoinColumn({ name: 'user_id' })
  users: User;
}
