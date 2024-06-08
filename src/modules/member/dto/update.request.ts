import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateMemberRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'code' })
  code: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', title: 'is penalized' })
  is_penalized: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: 'string', title: 'end of penalized' })
  end_of_penalized: Date;
}
