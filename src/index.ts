import { day1Problem1, day1Problem2 } from './day-1';
import { day2Problem1, day2Promblem2 } from './day-2';

async function main() {
  await logDayResult(1, day1Problem1, day1Problem2);
  await logDayResult(2, day2Problem1, day2Promblem2);
}

main();

/* helpers */

async function logDayResult(
  day: number,
  solution1?: () => Promise<unknown>,
  solution2?: () => Promise<unknown>
) {
  console.log(`Advent of Code - Day ${day}`);
  solution1 &&
    (await solution1().then((result) => console.log('Problem 1:', result)));
  solution2 &&
    (await solution2().then((result) => console.log('Problem 2: ', result)));
  console.log('\n');
}
