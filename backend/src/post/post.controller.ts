import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRequest } from './dto/create.dto';
import { FindAllResponce } from './dto/find-all.dto';
import { PostService } from './post.service';
import {
  BadRequest,
  InternalServerError,
  NotFound,
  Unauthorized,
} from '@/apiType/error.dto';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '投稿' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({
    status: 400,
    description: 'BadRequest',
    type: BadRequest,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerError,
  })
  async create(@Body() createRequest: CreateRequest, @Request() req) {
    return this.postService.create(createRequest, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '投稿一覧取得' })
  @ApiResponse({ status: 200, description: 'OK', type: [FindAllResponce] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerError,
  })
  async findAll() {
    return this.postService.findAll();
  }

  @Get('/:name')
  @ApiParam({ name: 'name', description: 'ユーザ名', example: 'test' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ユーザの投稿一覧取得' })
  @ApiResponse({ status: 200, description: 'OK', type: [FindAllResponce] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerError,
  })
  async findByUser(@Param('name') name: string) {
    return this.postService.findByUser(name);
  }
}