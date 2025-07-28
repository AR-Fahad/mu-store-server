import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/router';
import { noRoutesFound } from './app/middlewares/noRoutesFound';
import { globalErrorHandle } from './app/middlewares/globalErrorHandle';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'MU Store server is running successfully!',
  });
});

app.use('/api/v1', router);

app.use(noRoutesFound);

app.use(globalErrorHandle);

export default app;
