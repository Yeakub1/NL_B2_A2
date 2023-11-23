import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import { studentRoute } from './app/modules/student/student.route';

// parser
app.use(express.json());
app.use(cors());


// applicaton route
app.use('/api/v1/student', studentRoute)

app.use('/api/v1/student', studentRoute)

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
})

export default app;
