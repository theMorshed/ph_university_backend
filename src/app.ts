import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student_router';
import { userRoutes } from './app/modules/user/user_router';
import globalErrorHandler from './app/middlewares/global_error_handaler';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users/', userRoutes);

app.get('/', (req, res) => {
  res.send("Hello, World");
});

app.use(globalErrorHandler);

export default app;
