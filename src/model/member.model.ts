import { IMember } from 'src/entity/member.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Borrow } from './borrow.model';

@Entity({ name: 'members' })
export class Member implements IMember {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_penalized: boolean;

  @Column({ nullable: true })
  end_of_penalized: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @OneToMany(() => Borrow, (borrow) => borrow.member)
  borrow: Borrow[];
}
