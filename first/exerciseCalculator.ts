interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
}

const parseArguments2 = (args: Array<string>): Array<number> => {
  const days: Array<string> = args.slice(2);
  days.forEach(number => {
    if(isNaN(Number(number))) throw new Error('values were not numbers');
  });
  return days.map(n => Number(n));
};

export const exerciseCalculator = (args: Array<number>): Result => {
  const dailyExerciseHours = args.slice(1);
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.reduce((numberOfDays, day) => (
    day === 0 ? numberOfDays : numberOfDays + 1
  ), 0);
  const target: number = args[0];

  const _sumOfHours: number = dailyExerciseHours.reduce((prev, cur) => (
    prev + cur
  ), 0);
  const average: number = _sumOfHours / periodLength;

  const success: boolean = average >= target;
  let rating = 1;
  if (average / target > 0.75) rating = 2;
  if (average / target > 1.5) rating = 3;

  let ratingDescription = '';
  if (rating === 1) ratingDescription = 'bad';
  if (rating === 2) ratingDescription = 'good';
  if (rating === 3) ratingDescription = 'excellent';
  
  return {
    periodLength,
    trainingDays, 
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const args = parseArguments2(process.argv);
  console.log(exerciseCalculator(args));
} catch(e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error:', e.message);
}