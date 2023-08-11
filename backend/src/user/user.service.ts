import { Injectable } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(regiserRequest: RegisterRequest) {
    await this.prisma.user.create({
      data: {
        name: regiserRequest.name,
        //[] ハッシュ化
        password: regiserRequest.password,
      },
    });
  }
}
