import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMember } from 'src/entity/member.entity';
import { Member } from 'src/model/member.model';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMemberRequest } from '../dto/create.request';
import { UpdateMemberRequest } from '../dto/update.request';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) {}

  async findAll(): Promise<IMember[]> {
    return await this.repository.find({
      select: ['_id', 'code', 'name'],
    });
  }

  async findById(id: string): Promise<Member> {
    return await this.repository.findOne({
      where: { _id: id },
      relations: ['borrow'],
    });
  }

  async findByCode(code: string): Promise<Member> {
    return await this.repository.findOne({
      where: { code },
      relations: ['borrow'],
    });
  }

  async create(body: CreateMemberRequest): Promise<IMember> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<UpdateMemberRequest>,
  ): Promise<IMember> {
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
