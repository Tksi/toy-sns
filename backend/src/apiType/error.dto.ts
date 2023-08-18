import { ApiProperty } from '@nestjs/swagger';

export class InternalServerError {
  @ApiProperty({ example: 'Internal Server Error' })
  message: string;

  @ApiProperty({ example: 500 })
  statusCode: number;
}

export class BadRequest {
  @ApiProperty({ example: ['* should not be empty'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class Unauthorized {
  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}

export class Conflict {
  @ApiProperty({ example: 'Conflict' })
  message: string;

  @ApiProperty({ example: 409 })
  statusCode: number;
}

export class NotFound {
  @ApiProperty({ example: 'Not Found' })
  message: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}
