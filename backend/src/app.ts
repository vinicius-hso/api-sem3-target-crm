import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { route } from './routes/routes';

const app = express();

import './database';

//Config
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(route);

export default app;
