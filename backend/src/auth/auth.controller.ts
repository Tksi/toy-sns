import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponce } from './dto/login.dto';
import { Unauthorized } from '@/apiType/error.dto';
import { RegisterRequest } from '@/user/dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'OK', type: LoginResponce })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  async login(@Body() loginRequest: RegisterRequest) {
    return this.authService.login(loginRequest);
  }
}
