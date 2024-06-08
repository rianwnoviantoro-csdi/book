import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBook } from 'src/entity/book.entity';
import { Book } from 'src/model/book.model';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBookRequest } from '../dto/create.request';
import { UpdateBookRequest } from '../dto/update.request';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async findAll(): Promise<IBook[]> {
    return await this.repository.find({
      select: ['_id', 'code', 'name', 'author', 'stock'],
    });
  }

  async findById(id: string): Promise<IBook> {
    return await this.repository.findOne({
      where: { _id: id },
      relations: ['borrow'],
    });
  }

  async findByCode(code: string): Promise<IBook> {
    return await this.repository.findOne({
      where: { code },
      relations: ['borrow'],
    });
  }

  async create(body: CreateBookRequest): Promise<IBook> {
    return await this.repository.save(body);
  }

  async update(id: string, body: Partial<UpdateBookRequest>): Promise<IBook> {
    return await this.repository.save({
      _id: id,
      ...body,
      updated_at: new Date(),
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
