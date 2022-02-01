import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { port } from './config';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const urlV1 = '/api/v1';

import productRoute from './routes/product';
import categoryRoute from './routes/category';

app.use(`${urlV1}/products`, productRoute);
app.use(`${urlV1}/categories`, categoryRoute);

app.use('/', async (req: Request, res: Response) => {
  const message = 'Server Nyala';
  res.status(200).json({ message });
});

app.listen(port, () => {
  console.info(`App is listening at http://localhost:${port}`);
});
