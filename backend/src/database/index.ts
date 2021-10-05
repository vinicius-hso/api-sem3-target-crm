import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import mocks from '../utils/mock';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env' : '.env',
});

async function connect() {
  await createConnection();

  await mocks();
}

connect();
