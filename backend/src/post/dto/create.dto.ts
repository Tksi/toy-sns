import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRequest {
  @ApiProperty({ example: 'Hello!' })
  @IsNotEmpty()
  content: string;
}
