import supertest from 'supertest';
import app from '../../src/app';
const request = supertest.agent(app);

describe('test', () => {
  it('should be 2', async () => {
    expect(1 + 1).toBe(2);
  });

  it('should be get on /', async () => {
    await request.get('/').expect(200);
  });
});
