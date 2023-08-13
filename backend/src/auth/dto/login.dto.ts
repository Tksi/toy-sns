import { ApiProperty } from '@nestjs/swagger';

export class LoginResponce {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjkxOTA0NTQ0fQ.I0ShA2nC81q2i8rscX8W_EkrKqxvb1Jqgl_I72j9PBM',
  })
  token: string;
}
