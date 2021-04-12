import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const arg1 = req.query.weight;
  const arg2 = req.query.height;
  if (isNaN(Number(arg1)) || isNaN(Number(arg2))) {
    res.send({error: 'malformatted parameters'});
  }
  const weight = Number(arg1);
  const height = Number(arg2);
  const bmi = calculateBmi(height, weight);
  const result = {
    weight,
    height,
    bmi
  };
  res.send(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const body: any = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.daily_exercises || !body.target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const dailyExercises: [number] = body.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target: number = body.target;

  if (typeof(dailyExercises) !== 'object' || typeof(target) !== 'number' ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  
  const params = [target, ...dailyExercises];
  const result = exerciseCalculator(params);
  
  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running  on port ${PORT}`);
});