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

export class InternalServerError {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Internal Server Error' })
  message: string;
}
