import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateBookRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'code' })
  code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'author' })
  author: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', title: 'stock' })
  stock: number;
}
