import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMemberRequest } from '../dto/create.request';
import { MemberCRUDApplication } from '../application/member-crud.application';
import { ApiTags } from '@nestjs/swagger';
import { MemberApplication } from '../application/member-index.application';

@Controller('member')
@ApiTags('Members')
export class MemberController {
  constructor(
    private readonly crud: MemberCRUDApplication,
    private readonly index: MemberApplication,
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
    @Body() body: CreateMemberRequest,
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
}
