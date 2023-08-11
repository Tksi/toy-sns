import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterRequest } from './dto/register.dto';

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
