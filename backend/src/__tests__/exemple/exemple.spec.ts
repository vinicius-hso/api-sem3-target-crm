import app from '../../app';
import request from 'supertest';

describe('Exemple!', () => {
  it('Should be 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('Should be get to /', async () => {
    const res = await request(app).get('/');

    expect(res.body).toEqual({ API: 'Terceiro Semetre' });
  });
});
