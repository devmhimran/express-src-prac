import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export { app };
