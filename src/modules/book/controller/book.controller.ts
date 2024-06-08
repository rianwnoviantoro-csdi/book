import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBookRequest } from '../dto/create.request';
import { BookCRUDApplication } from '../application/book-crud.application';
import { BorrowBookRequest } from '../dto/borrow.request';
import { ApiTags } from '@nestjs/swagger';
import { ReturnBookRequest } from '../dto/return.request';
import { BookApplication } from '../application/book-index.application';

@Controller('book')
@ApiTags('Books')
export class BookController {
  constructor(
    private readonly crud: BookCRUDApplication,
    private readonly index: BookApplication,
  ) {}

  @Get()
  async fetch(): Promise<{ message: string; data: any }> {
    try {
      const data = await this.index.fetch();

      return {
        message: 'Success.',
        data,
      };
    } catch (error) {
      return {
        message: 'Error.',
        data: error?.message,
      };
    }
  }

  @Get(':id')
  async detail(
    @Param('id') id: string,
  ): Promise<{ message: string; data: any }> {
    try {
      const data = await this.index.detail(id);

      return {
        message: 'Success.',
        data,
      };
    } catch (error) {
      return {
        message: 'Error.',
        data: error?.message,
      };
    }
  }

  @Post()
  async create(
    @Body() body: CreateBookRequest,
  ): Promise<{ message: string; data: any }> {
    try {
      const data = await this.crud.create(body);

      return {
        message: 'Success.',
        data,
      };
    } catch (error) {
      return {
        message: 'Error.',
        data: error?.message,
      };
    }
  }

  @Post('borrow')
  async borrow(
    @Body() body: BorrowBookRequest,
  ): Promise<{ message: string; data: any }> {
    try {
      const data = await this.crud.borrow(body);

      return {
        message: 'Success.',
        data,
      };
    } catch (error) {
      return {
        message: 'Error.',
        data: error?.message,
      };
    }
  }

  @Put('return/:borrow_code')
  async returned(
    @Param('borrow_code') param: string,
    @Body() body: ReturnBookRequest,
  ): Promise<{ message: string; data: any }> {
    try {
      const data = await this.crud.returned(param, body);

      return {
        message: 'Success.',
        data,
      };
    } catch (error) {
      return {
        message: 'Error.',
        data: error?.message,
      };
    }
  }
}
