import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/model/book.model';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { BookCRUDApplication } from './application/book-crud.application';
import { Borrow } from 'src/model/borrow.model';
import { MemberModule } from '../member/member.module';
import { BookApplication } from './application/book-index.application';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow]), MemberModule],
  controllers: [BookController],
  providers: [BookService, BookCRUDApplication, BookApplication],
})
export class BookModule {}
