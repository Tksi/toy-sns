import { execSync } from 'node:child_process';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get(PrismaService);

    // reset DB before test
    execSync('npx prisma migrate reset --force');
    await app.init();
  });

  const registerUser = {
    name: 'test',
    password: 'password',
  };

  describe('POST /auth/register', () => {
    it('OK', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser)
        .expect(201);
    });

    it('OK DBに登録されている', async () => {
      // find latest user
      const registeredUser = await prismaService.user.findFirst({
        orderBy: { id: 'desc' },
      });

      return expect(registeredUser).toMatchObject(registerUser);
    });

    it('NG 既に同じnameが登録されている', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser)
        .expect(409);
    });
  });

  describe('POST /auth/login', () => {
    it('OK', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(registerUser)
        .expect(201);
    });

    it('NG パスワードが間違っている', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...registerUser, password: 'wrong password' })
        .expect(401);
    });
  });
});
