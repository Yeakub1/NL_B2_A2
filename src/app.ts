import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import { UserRoute } from './app/modules/student/user.route';

// parser
app.use(express.json());
app.use(cors());

// applicaton route
app.use('/api', UserRoute);
// app.use('/api/v1/student', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
