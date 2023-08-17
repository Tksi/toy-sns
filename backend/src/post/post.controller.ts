import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequest } from './dto/create.dto';
import { PostService } from './post.service';
import {
  BadRequest,
  InternalServerError,
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
}
