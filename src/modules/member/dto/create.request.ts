import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'code' })
  code: string;
}
