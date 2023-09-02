import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequest } from './dto/create.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  private take = 20;

  async create(createRequest: CreateRequest, userId: number) {
    await this.prismaService.post.create({
      data: {
        ...createRequest,
        userId,
      },
    });
  }

  async findAll(page: number) {
    return this.prismaService.post.findMany({
      skip: this.take * (page - 1),
      take: this.take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findByUser(name: string, page: number) {
    const posts = await this.prismaService.post.findMany({
      skip: this.take * (page - 1),
      take: this.take,
      where: {
        user: {
          name,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return posts;
  }
}
