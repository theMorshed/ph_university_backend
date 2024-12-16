import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.send("Hello, World");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
