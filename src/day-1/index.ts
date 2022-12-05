import * as path from 'path';
import { groupByDelimiter, readLines } from '../utils';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_1_input.txt');

export async function day1Problem1() {
  const meals = readLines<string>(inputPath);
  const mealsPerElf = groupByDelimiter<string>('', meals);

  let max = 0;
  for await (const meals of mealsPerElf) {
    max = Math.max(max, calculateTotalMealCalories(meals));
  }
  return max;
}

export async function day1Problem2() {
  const meals = readLines<string>(inputPath);
  const mealsPerElf = groupByDelimiter('', meals);

  let topThree = [0, 0, 0];

  for await (const meals of mealsPerElf) {
    const min = Math.min(...topThree);
    const currentElfCalories = calculateTotalMealCalories(meals);

    if (currentElfCalories > min) updateTopThree(currentElfCalories);
  }

  return topThree.reduce((acc, cur) => (acc += cur), 0);

  function updateTopThree(elf: number) {
    if (elf > topThree[0]) {
      topThree[2] = topThree[1];
      topThree[1] = topThree[0];
      topThree[0] = elf;
    } else if (elf > topThree[1]) {
      topThree[2] = topThree[1];
      topThree[1] = elf;
    } else {
      topThree[2] = elf;
    }
  }
}

/* helpers */

function calculateTotalMealCalories(meals: Array<string>) {
  return meals.reduce((acc, cur) => (acc += parseInt(cur)), 0);
}
