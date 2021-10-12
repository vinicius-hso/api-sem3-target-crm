import connection from '../mocks/mockConnection';
import { mocks } from '../mocks/dataMock';
import request from 'supertest';
import app from '../../app';

describe('User Controller', () => {
  let env: any;
  let token: string;

  beforeAll(async () => {
    await connection.create();
    env = await mocks();

    await request(app)
      .post('/auth/authenticate')
      .send({ email: env.userAdmin.email, password: env.userAdmin.password })
      .then((res) => {
        token = res.body.token;
      });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('get user', () => {
    it('Should be get 401', async () => { 
      await request(app)
        .get('/user')
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });
  
    it('Should be get 403', async () => {
      let token;
      await request(app)
      .post('/auth/authenticate')
      .send({ email: env.userSeller.email, password: env.userSeller.password })
      .then((res) => {
        token = res.body.token;
        expect(res.status).toBe(200);
      });
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body.message).toBe('You are not authorized');
        });
    });
  })

  describe('create user', () => {
    it('Should be get 401', async () => {
      const user = {
        name: 'foo',
        email: 'foo@foo.com',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });
  
    it('Should be get 403', async () => {
      let token;
      await request(app)
      .post('/auth/authenticate')
      .send({ email: env.userSeller.email, password: env.userSeller.password })
      .then((res) => {
        token = res.body.token;
      });
  
      const user = {
        name: 'foo',
        email: 'foo@foo.com',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .send(user)
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body.message).toBe('You are not authorized');
        });
    });
    
    it('Should be create user with role SELLER', async () => {
      const user = {
        name: 'foo',
        email: 'foo@foo.com',
        role: 'SELLER',
      };
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it('Should be create user with role ADMIN', async () => {
      const user = {
        name: 'foo',
        email: 'foo1@foo1.com',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  
    it('Should not be create user - without name', async () => {
      const user = {
        email: 'foo@foo.com',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('Invalid values for new User!');
        });
    });
  
    it('Should not be create user - without email', async () => {
      const user = {
        name: 'foo',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('Invalid values for new User!');
        });
    });
  
    it('Should not be create user - user exists', async () => {
      const user = {
        name: 'foo',
        email: 'foo@foo.com',
        role: 'ADMIN',
      };
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user);
  
      await request(app)
        .post('/user')
        .set('authorization', `Bearer ${token}`)
        .send(user)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('User already exists');
        });
    });
  })
});
