import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'test' })
  name: string;
}

export class FindAllResponce {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Hello!' })
  content: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: User })
  user: User;
}
