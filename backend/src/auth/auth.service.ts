import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { RegisterRequest } from '@/auth/dto/register.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(regiserRequest: RegisterRequest) {
    await this.prismaService.user
      .create({
        data: {
          name: regiserRequest.name,
          //[] ハッシュ化
          password: regiserRequest.password,
        },
      })
      .catch((err) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          // ユニーク制約違反
          err.code === 'P2002'
        ) {
          throw new ConflictException();
        }

        throw err;
      });
  }

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
