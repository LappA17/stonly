import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

const loginUserDto = {
  email: 'ruslanpostoiuk@gmail.com',
  password: '123',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post('/user/login').send(loginUserDto);
    token = body.access_token;
  });

  it('/user/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginUserDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBe(token);
      });
  });

  it('/user/login (POST) - failed', () => {
    return (
      request(app.getHttpServer())
        .post('/auth/login')
        //поменяем поля пароля
        .send({ ...loginUserDto, password: '0' })
        .expect(401)
    );
  });

  it('/auth/login (POST) - failed', () => {
    return (
      request(app.getHttpServer())
        .post('/user/login')
        //поменяем поля логина
        .send({ ...loginUserDto, login: '0' })
        .expect(401)
    );
  });
});
