import { execSync } from 'node:child_process';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { AuthModule } from '@/auth/auth.module';
import { PostModule } from '@/post/post.module';
import { PrismaService } from '@/prisma.service';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get(PrismaService);

    // reset DB before test
    execSync('npx prisma migrate reset --force');
    await app.init();

    // create user
    const registerUser = {
      name: 'test',
      password: 'password',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerUser);

    // get token
    token = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(registerUser)
        .then((res) => res.body)
    ).token;
  });

  const registerPost = {
    content: 'test',
  };

  describe('POST /post', () => {
    it('OK', async () => {
      return request(app.getHttpServer())
        .post('/post')
        .set('Authorization', `Bearer ${token}`)
        .send(registerPost)
        .expect(201);
    });

    it('OK DBに登録されている', async () => {
      // find latest post
      const registeredPost = await prismaService.post.findFirst({
        orderBy: { id: 'desc' },
      });

      return expect(registeredPost).toMatchObject(registerPost);
    });

    it('NG tokenがない', async () => {
      return request(app.getHttpServer())
        .post('/post')
        .send(registerPost)
        .expect(401);
    });
  });
});
