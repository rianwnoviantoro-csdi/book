import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { CreateMemberRequest } from '../dto/create.request';

@Injectable()
export class MemberCRUDApplication {
  constructor(private readonly memberService: MemberService) {}

  async create(body: CreateMemberRequest): Promise<any> {
    try {
      const member = await this.memberService.create(body);

      return member;
    } catch (error) {
      console.log(error?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
