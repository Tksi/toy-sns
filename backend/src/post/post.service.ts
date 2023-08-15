import { Injectable } from '@nestjs/common';
import { CreateRequest } from './dto/create.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(createRequest: CreateRequest, userId: number) {
    await this.prismaService.post.create({
      data: {
        ...createRequest,
        userId,
      },
    });
  }
}
