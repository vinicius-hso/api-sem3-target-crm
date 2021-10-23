import { mocks } from "../__mocks__/dataMock";
import connection from "../__mocks__/mockConnection";
import request from 'supertest';
import app from "@src/app";
import { AuthMock } from "../__mocks__/mockAuth";

describe('Company Controller', () => {
  let env;
  beforeAll(async () => {
    await connection.create();
    env = await mocks();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('get companies', () => {
    it('should be get 401', async () => {
      await request(app)
        .get('/company')
        .then(res => {
          expect(res.status).toBe(401)
          expect(res.body.message).toBe('No Token provided')
        })
    })

    it('should be get companies with seller', async () => {
      await request(app)
        .get('/company')
        .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('country');
          expect(res.body[0]).toHaveProperty('state');
          expect(res.body[0]).toHaveProperty('city');
          expect(res.body[0]).toHaveProperty('site');
          expect(res.body[0]).not.toHaveProperty('picture');
        })
    })
  })

  // describe('get companies by id', () => {})

  describe('create companies', () => {
    it('should not be create a company', async () => {
      await request(app)
      .post('/company')
      .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
      .send()
      .then(res => {
        expect(res.status).toBe(400)
        expect(res.body.message).toBe('teste')
      })
    })

    it('should be create a company', async () => {
      const company = {
        name: 'Mochip',
        country: 'Brasil',
        state: 'SP',
        city: 'Botucatu',
        site: 'www.mochip.com.br',
        picture: 'https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg',
      }

      await request(app)
      .post('/company')
      .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
      .send(company)
      .then(res => {
        expect(res.status).toBe(201)
      })
    })
  })



})
