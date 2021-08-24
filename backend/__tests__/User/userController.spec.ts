// jest.useFakeTimers()
// import { createConnection } from 'typeorm';
// import request from 'supertest';
import supertest from 'supertest';
import * as dotenv from 'dotenv';
import app from '@src/app';
const request = supertest.agent(app)

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

describe('User Controllers', () => {
  let user;
  beforeAll(async () => {
    // await createConnection();

    user = {
      name: 'foo',
      email: 'foo@bar.com',
      passwordHash: 'password',
      role: 'admin',
    };
  });

  describe('Create', () => {
    it('should be create a new user', async () => {
      await request
        .post('/user/register')
        .send(user)
        .expect(201)
        .expect((res) => {
          console.log(res);
        });
    });

    it('should be status 400', async () => {
      await request
        .post('/user/register')
        .send(user)
        .expect(400)
        .expect((res) => {
          res.body.message.should.equal('User already exists');
        });
    });
  });
});
