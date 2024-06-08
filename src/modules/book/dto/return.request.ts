import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ReturnBookRequest {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: 'string',
    title: 'date returned',
    example: '2024-01-01 23:40:40',
  })
  date_returned: string;
}
