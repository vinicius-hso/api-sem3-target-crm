import supertest from 'supertest';
import app from '@src/app';
const request = supertest.agent(app)

describe('User Controllers', () => {
  let user;
  beforeAll(async () => {
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
