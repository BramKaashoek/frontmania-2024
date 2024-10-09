import express from 'express';
import fruitRouter from './routes/fruit';

const app = express();

app.use(fruitRouter);
app.use('/static', express.static('public'));

app.listen(4000, () => {
  console.log('API up');
});
