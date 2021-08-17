import Router from 'express';

const route = Router();

route.get('/', (req, res) => {
  res.send({ API: 'Terceiro Semetre' });
});

export { route };
