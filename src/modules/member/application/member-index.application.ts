import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Member } from 'src/model/member.model';
import { Borrow } from 'src/model/borrow.model';

@Injectable()
export class MemberApplication {
  constructor(private connection: Connection) {}

  async fetch(): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const membersWithBooks = await entityManager
          .createQueryBuilder(Member, 'member')
          .select([
            'member._id',
            'member.code',
            'member.name',
            'member.is_penalized',
            'member.end_of_penalized',
          ])
          .getMany();

        const borrowedBooksCounts = await entityManager
          .createQueryBuilder(Borrow, 'borrow')
          .select('borrow.member_id', 'memberId')
          .addSelect('COUNT(borrow._id)', 'count')
          .where('borrow.status = :status', { status: 'BORROWED' })
          .groupBy('borrow.member_id')
          .getRawMany();

        const borrowedBooksCountMap = borrowedBooksCounts.reduce(
          (acc, item) => {
            acc[item.memberId] = parseInt(item.count, 10);
            return acc;
          },
          {},
        );

        membersWithBooks.forEach((member: any) => {
          member.borrowed_books = borrowedBooksCountMap[member._id] || 0;
        });

        return membersWithBooks;
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async detail(id: string): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        return await entityManager
          .createQueryBuilder(Member, 'member')
          .leftJoin('member.borrow', 'borrow', 'borrow.status = :status', {
            status: 'BORROWED',
          })
          .leftJoin('borrow.book', 'book')
          .addSelect([
            'borrow.date_borrowed',
            'book._id',
            'book.code',
            'book.name',
          ])
          .where('member._id = :id', { id })
          .getOne();
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
