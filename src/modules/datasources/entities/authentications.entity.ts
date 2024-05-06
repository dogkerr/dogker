import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('authentications')
export class Authentication {
  @PrimaryGeneratedColumn('uuid')
  id: string; // JWT ID

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
