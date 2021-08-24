import Router from 'express';
import { UserRoutes } from './userRoutes';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const route = Router();

route.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

route.use('/user', UserRoutes);

export { route };
