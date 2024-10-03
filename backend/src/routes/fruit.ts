import { Router } from 'express';
import { fruits } from '../fruit';

const router = new Router();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

router.get('/fruit', async (_req, res) => {
  console.log('GET /fruit');

  return res.status(200).json(Object.values(fruits));
});

router.get('/fruit/:slug', async (req, res) => {
  const { slug } = req.params;
  console.log(`GET /fruit/${slug}`);

  if (slug === 'cherry') {
    await sleep(Math.random() * 1000);
  }

  const fruit = fruits[slug];
  if (!fruit) return res.status(404).json({ error: 'Fruit not found' });
  return res.status(200).json(fruit);
});

export default router;
