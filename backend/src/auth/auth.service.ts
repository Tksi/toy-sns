import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma.service';
import { RegisterRequest } from '@/user/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ name, password }: RegisterRequest) {
    const user = await this.prismaService.user.findUnique({
      where: { name },
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, name: user.name };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
