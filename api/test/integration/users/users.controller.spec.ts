import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { mockCreateUserDto } from 'test/mocks/user-mock';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let createUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(mockCreateUserDto)
      .expect(201);
    expect(response.body).toHaveProperty('id');
    createUserId = response.body.id;
  });
  it('/users:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createUserId}`)
      .expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
});
