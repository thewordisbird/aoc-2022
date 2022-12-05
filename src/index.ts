import { day1Problem1, day1problem2 } from './day-1';

logResults(1, day1Problem1, day1problem2);

async function logResults(
  day: number,
  solution1: () => Promise<unknown>,
  solution2: () => Promise<unknown>
) {
  console.log(`Advent of Code - Day ${day}`);
  await solution1().then((result) => console.log('Problem 1: ', result));
  await solution2().then((result) => console.log('Problem 2: ', result));
  console.log('\n');
}
