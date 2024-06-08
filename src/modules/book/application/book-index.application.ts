import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Book } from 'src/model/book.model';
import { Borrow } from 'src/model/borrow.model';

@Injectable()
export class BookApplication {
  constructor(private connection: Connection) {}

  async fetch(): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const books = await entityManager
          .createQueryBuilder(Book, 'book')
          .leftJoin('book.borrow', 'borrow')
          .where('borrow._id IS NULL OR borrow.status = :status', {
            status: 'RETURNED',
          })
          .getMany();

        const borrowedCounts = await entityManager
          .createQueryBuilder(Borrow, 'borrow')
          .select('borrow.book_id', 'bookId')
          .addSelect('COUNT(borrow._id)', 'borrowedCount')
          .where('borrow.status = :status', { status: 'BORROWED' })
          .groupBy('borrow.book_id')
          .getRawMany();

        const borrowedCountMap = borrowedCounts.reduce((acc, item) => {
          acc[item.bookId] = parseInt(item.borrowedCount, 10);
          return acc;
        }, {});

        books.forEach((book: any) => {
          book.borrowedCount = borrowedCountMap[book._id] || 0;
        });

        const newBooks: any = books.filter(
          (book: any) => book.borrowedCount < book.stock,
        );

        return newBooks.map(({ borrowedCount, ...rest }) => rest);
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async detail(id: string): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const book = await entityManager
          .createQueryBuilder(Book, 'book')
          .leftJoin('book.borrow', 'borrow', 'borrow.status = :status', {
            status: 'BORROWED',
          })
          .leftJoin('borrow.member', 'member')
          .addSelect([
            'borrow.date_borrowed',
            'member._id',
            'member.code',
            'member.name',
          ])
          .where('book._id = :id', { id })
          .getOne();

        return book;
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
