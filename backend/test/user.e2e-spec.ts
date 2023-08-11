import { execSync } from 'node:child_process';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma.service';
import { UserModule } from '@/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
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

  it('POST /user/register OK 201', async () => {
    console.log(process.env.DATABASE_URL);

    return request(app.getHttpServer())
      .post('/user/register')
      .send(registerUser)
      .expect(201);
  });

  it('POST /user/register OK DBに登録されている', async () => {
    // find latest user
    const registeredUser = await prismaService.user.findFirst({
      orderBy: { id: 'desc' },
    });

    return expect(registeredUser).toMatchObject(registerUser);
  });

  it('POST /user/register NG 既に同じnameが登録されている', async () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send(registerUser)
      .expect(500);
  });
});
