import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/model/member.model';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';
import { MemberCRUDApplication } from './application/member-crud.application';
import { MemberApplication } from './application/member-index.application';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberCRUDApplication, MemberApplication],
  exports: [MemberService],
})
export class MemberModule {}
