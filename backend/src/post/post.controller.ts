import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRequest } from './dto/create.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createRequest: CreateRequest, @Request() req) {
    console.log(req);

    return this.postService.create(createRequest, req.user.id);
  }
}
