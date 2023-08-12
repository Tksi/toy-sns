import { ApiProperty } from '@nestjs/swagger';

export class LoginResponce {
  @ApiProperty({ example: 'token' })
  token: string;
}
