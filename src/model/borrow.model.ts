import { IBook } from 'src/entity/book.entity';
import { IBorrow } from 'src/entity/borrowed.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.model';
import { Book } from './book.model';

@Entity({ name: 'borrows' })
export class Borrow implements IBorrow {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  book_id: string;

  @Column()
  member_id: string;

  @Column()
  date_borrowed: Date;

  @Column({ nullable: true })
  date_returned: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @ManyToOne(() => Member, (member) => member._id)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Book, (book) => book._id)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
