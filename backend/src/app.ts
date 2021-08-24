import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { route } from './routes/routes';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// Config
const app = express();

import './database';

app.use(express.json());
app.use(cors());
app.use(route);

export default app;
