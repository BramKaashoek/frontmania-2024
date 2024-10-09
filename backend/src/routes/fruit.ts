import { trace } from '@opentelemetry/api';
import { Router } from 'express';
import db from '../db';
const router = new Router();

router.get('/fruit', async (_req, res) => {
  console.log('GET /fruit');

  const fruits = await db.getFruits();

  return res.status(200).json(fruits);
});

router.get('/fruit/:slug', async (req, res) => {
  const { slug } = req.params;
  console.log(`GET /fruit/${slug}`);

  const fruit = await trace
    .getTracer('express-api')
    .startActiveSpan(`db-get-fruit`, async (span) => {
      span.setAttribute('fruit', slug);
      const fruit = await db.getFruit(slug);

      span.end();
      return fruit;
    });

  if (!fruit) return res.status(404).json({ error: 'Fruit not found' });
  return res.status(200).json(fruit);
});

export default router;
