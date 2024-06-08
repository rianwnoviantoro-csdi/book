import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from '../service/book.service';
import { CreateBookRequest } from '../dto/create.request';
import { BorrowBookRequest } from '../dto/borrow.request';
import { MemberService } from 'src/modules/member/service/member.service';
import { Connection } from 'typeorm';
import { Borrow } from 'src/model/borrow.model';
import * as dayjs from 'dayjs';
import { ReturnBookRequest } from '../dto/return.request';
import { Member } from 'src/model/member.model';

@Injectable()
export class BookCRUDApplication {
  constructor(
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
    private connection: Connection,
  ) {}

  async create(body: CreateBookRequest): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const book = await this.bookService.create(body);

        return book;
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async borrow(body: BorrowBookRequest): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const book = await this.bookService.findById(body.book_id);

        if (!book) {
          throw new NotFoundException('Book not found.');
        }

        const isBorrowed = await entityManager.count(Borrow, {
          where: { book_id: body.book_id, status: 'BORROWED' },
        });

        if (isBorrowed === book.stock) {
          throw new BadRequestException('The book you want is being borrowed.');
        }

        const member = await this.memberService.findById(body.member_id);

        if (!member) {
          throw new NotFoundException('Member not found.');
        }

        if (
          member.is_penalized &&
          dayjs(member.end_of_penalized).diff(dayjs(), 'day') < 3
        ) {
          throw new BadRequestException('Member is currently under penalty.');
        }

        if (member.borrow.length >= 2) {
          throw new BadRequestException(
            'Member are not allow borrow books more than 2.',
          );
        }

        await entityManager.save(Member, {
          ...member,
          is_penalized: false,
          end_of_penalized: null,
        });

        const borrowed = await entityManager.save(Borrow, {
          code:
            'B-' +
            book.code.replaceAll('-', '') +
            dayjs().format('YYYYMMDDHmmss'),
          member: member,
          book: book,
          date_borrowed: dayjs().format('YYYY-MM-DD'),
          status: 'BORROWED',
        });

        return borrowed;
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async returned(code: string, body: ReturnBookRequest): Promise<any> {
    try {
      return this.connection.transaction(async (entityManager) => {
        const borrow = await entityManager.findOne(Borrow, {
          where: { code },
          relations: ['book', 'member'],
        });

        if (!borrow) {
          throw new NotFoundException('Borrow code not found.');
        }

        if (borrow.status === 'RETURNED') {
          throw new BadRequestException('That book has been returned.');
        }

        const isMoreThan7Days =
          dayjs(body.date_returned).diff(dayjs(borrow.date_borrowed), 'day') >
          7;

        await entityManager.save(Borrow, {
          ...borrow,
          date_returned: dayjs(body.date_returned).format('YYYY-MM-DD'),
          status: 'RETURNED',
        });

        if (isMoreThan7Days) {
          await this.memberService.update(borrow.member_id, {
            is_penalized: true,
            end_of_penalized: dayjs().add(3, 'days').toDate(),
          });
        }

        return borrow;
      });
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
