import { Fruit, fruits, sleep } from './helpers';

const db = {
  getFruits: async (): Promise<Fruit[]> => {
    return Object.values(fruits);
  },
  getFruit: async (slug: string): Promise<Fruit | undefined> => {
    if (slug === 'cherry') {
      await sleep(Math.random() * 1000);
    }

    return fruits[slug];
  },
};

export default db;
