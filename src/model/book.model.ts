import { IBook } from 'src/entity/book.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Borrow } from './borrow.model';

@Entity({ name: 'books' })
export class Book implements IBook {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrow: Borrow[];
}
