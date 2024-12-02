import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/global_error_handaler';
import notFound from './app/middlewares/not_found';
import router from './app/routes';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.send("Hello, World");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
