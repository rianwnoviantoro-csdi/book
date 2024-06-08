import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'code' })
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', title: 'author' })
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number', title: 'stock' })
  stock: number;
}
