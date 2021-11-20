import { mocks } from '../__mocks__/dataMock';
import connection from '../__mocks__/mockConnection';
import request from 'supertest';
import app from '@src/app';
import { AuthMock } from '../__mocks__/mockAuth';
import { v4 } from 'uuid';
import Company from '@entities/Company';
import Chance from 'chance';
const chance = new Chance();

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
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });

    it('should be get companies with Seller', async () => {
      await request(app)
        .get('/company')
        .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('country');
          expect(res.body[0]).toHaveProperty('state');
          expect(res.body[0]).toHaveProperty('city');
          expect(res.body[0]).toHaveProperty('site');
          expect(res.body[0]).toHaveProperty('picture');
        });
    });

    it('should be get companies with Admin', async () => {
      await request(app)
        .get('/company')
        .set('authorization', 'Bearer ' + AuthMock(env.userAdmin.email, env.userAdmin.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('country');
          expect(res.body[0]).toHaveProperty('state');
          expect(res.body[0]).toHaveProperty('city');
          expect(res.body[0]).toHaveProperty('site');
          expect(res.body[0]).toHaveProperty('picture');
        });
    });
  });

  describe('get company by id', () => {
    it('should be get 401', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      await request(app)
        .get(`/company/${company.id}`)
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });

    it('should be get companyById with Seller', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      await request(app)
        .get(`/company/${company.id}`)
        .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('country');
          expect(res.body).toHaveProperty('state');
          expect(res.body).toHaveProperty('city');
          expect(res.body).toHaveProperty('site');
          expect(res.body).toHaveProperty('picture');
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
          expect(res.body).toHaveProperty('deletedAt');
        });
    });

    it('should be get companyById with Admin', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      await request(app)
        .get(`/company/${company.id}`)
        .set('authorization', 'Bearer ' + AuthMock(env.userAdmin.email, env.userAdmin.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('country');
          expect(res.body).toHaveProperty('state');
          expect(res.body).toHaveProperty('city');
          expect(res.body).toHaveProperty('site');
          expect(res.body).toHaveProperty('picture');
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
          expect(res.body).toHaveProperty('deletedAt');
        });
    });
  });

  describe('create company', () => {
    it('should be get 401', async () => {
      await request(app)
        .post('/company')
        .send()
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });

    it('should not be create a company', async () => {
      const company = {
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      };

      await request(app)
        .post('/company')
        .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
        .send(company)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('Invalid company name');
        });
    });

    it('should be create a company', async () => {
      const company = {
        name: chance.name(),
      };
      await request(app)
        .post('/company')
        .set('authorization', 'Bearer ' + AuthMock(env.userSeller.email, env.userSeller.id))
        .send(company)
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty('id');
        });
    });
  });

  describe('update company', () => {
    it('should be get 401 - No Token provided', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      const companyUpdated = {
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      };

      await request(app)
        .put(`/company/${company.id}`)
        .send(companyUpdated)
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });

    it('should be get 404 - Update failed, try again', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      const companyUpdated = {
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      };

      await request(app)
        .put(`/company/${null}`)
        .send(companyUpdated)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.error).toBe('Update failed, try again');
        });
    });

    it('should be get 404 - Company does not exist', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      const companyUpdated = {
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      };

      await request(app)
        .put(`/company/${v4()}`)
        .send(companyUpdated)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.message).toBe('Company does not exist');
        });
    });

    it('should be get 200 - Company updated successfully', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      const companyUpdated = {
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      };

      await request(app)
        .put(`/company/${company.id}`)
        .send(companyUpdated)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('Company updated successfully');
        });

      const companyFind = await Company.findOne(company.id);

      expect(companyFind.name).toBe(companyUpdated.name);
      expect(companyFind.country).toBe(companyUpdated.country);
      expect(companyFind.state).toBe(companyUpdated.state);
      expect(companyFind.city).toBe(companyUpdated.city);
      expect(companyFind.site).toBe(companyUpdated.site);
      expect(companyFind.picture).toBe(companyUpdated.picture);
    });
  });

  describe('delete company', () => {
    it('should be get 401 - No Token provided', async () => {
      await request(app)
        .delete(`/company/${env.userSeller.id}`)
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No Token provided');
        });
    });

    it('should be get 404 - Update failed, try again', async () => {
      await request(app)
        .put(`/company/${null}`)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.error).toBe('Update failed, try again');
        });
    });

    it('should be get 404 - Cannot find company', async () => {
      await request(app)
        .delete(`/company/${v4()}`)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.message).toBe('Cannot find company');
        });
    });

    it('should be get 200 - Company deleted successfully', async () => {
      const company = await Company.create({
        name: chance.name(),
        country: chance.country(),
        state: chance.state(),
        city: chance.city(),
        site: chance.string(),
        picture: chance.avatar(),
      }).save();

      await request(app)
        .delete(`/company/${company.id}`)
        .set('authorization', 'Bearer ' + AuthMock(env.otherUserSeller.email, env.otherUserSeller.id))
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('Company deleted successfully');
        });

      const userFind = await Company.findOne(company.id);
      expect(userFind).toBeUndefined();

      const companyFindWithDeleted = await Company.findOne(company.id, { withDeleted: true });
      expect(companyFindWithDeleted.id).toBe(company.id);
      expect(companyFindWithDeleted).not.toBeUndefined();
      expect(companyFindWithDeleted.deletedAt).not.toBeNull();
    });
  });
});
