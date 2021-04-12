const checkNumberOfArguments = (args: Array<string>): void => {
  if (args.length < 4) throw new Error('not enough args');
  if (args.length > 4) throw new Error('too many args');
};

interface BmiValues {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): BmiValues => {
  const isNotNaN = (numberToCheck: number): boolean => {
    return !isNaN(numberToCheck);
  };

  const argument1 = Number(args[2]);
  const argument2 = Number(args[3]);

  if (isNotNaN(argument1) && isNotNaN(argument2)) {
    return {
      height: argument1,
      weight: argument2,
    };
  } else throw new Error('values were not numbers');
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMetersSquared = (height/100) ** 2;
  const bmi: number = weight / heightInMetersSquared;
  if (bmi < 15) return 'Very severely underweight';
  if (bmi < 16) return 'Severely underweight';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese Class I (Moderately obese)';
  if (bmi < 40) return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
};

try {
  checkNumberOfArguments(process.argv);
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error:', e.message);
}
