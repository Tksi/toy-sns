import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequest } from './dto/register.dto';
import { UserService } from './user.service';
import { InternalServerError } from '@/apiType/error.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerError,
  })
  async register(@Body() regiserRequest: RegisterRequest) {
    return this.userService.register(regiserRequest);
  }
}
