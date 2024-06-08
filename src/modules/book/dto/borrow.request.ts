import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BorrowBookRequest {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: 'string', title: 'book_id' })
  book_id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: 'string', title: 'member_id' })
  member_id: string;
}
