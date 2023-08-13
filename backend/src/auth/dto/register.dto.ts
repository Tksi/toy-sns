import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;
}
