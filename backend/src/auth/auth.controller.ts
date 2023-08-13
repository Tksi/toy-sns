import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginResponce } from './dto/login.dto';
import { InternalServerError, Unauthorized } from '@/apiType/error.dto';
import { RegisterRequest } from '@/auth/dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'ユーザ登録' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerError,
  })
  async register(@Body() regiserRequest: RegisterRequest) {
    return this.authService.register(regiserRequest);
  }

  @Post('login')
  @ApiOperation({ summary: 'ログイン' })
  @ApiResponse({ status: 201, description: 'OK', type: LoginResponce })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  async login(@Body() loginRequest: RegisterRequest) {
    return this.authService.login(loginRequest);
  }

  @Get('me')
  @ApiOperation({ summary: 'ログイン中のユーザ情報取得' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async me(@Request() req) {
    return req.user;
  }
}
