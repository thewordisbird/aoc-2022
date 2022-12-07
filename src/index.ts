import { day1Problem1, day1Problem2 } from "./day-1";
import { day2Problem1, day2Promblem2 } from "./day-2";
import { day3Problem1, day3Problem2 } from "./day-3";
import { day4Problem1, day4Problem2 } from "./day-4";
import { day5Problem1, day5Problem2 } from "./day-5";
import { day6Problem1 } from "./day-6";
import { day7Problem1, day7Problem2 } from "./day-7";

async function main() {
  await logDayResult(1, day1Problem1, day1Problem2);
  await logDayResult(2, day2Problem1, day2Promblem2);
  await logDayResult(3, day3Problem1, day3Problem2);
  await logDayResult(4, day4Problem1, day4Problem2);
  await logDayResult(5, day5Problem1, day5Problem2);
  await logDayResult(6, day6Problem1);
  await logDayResult(7, day7Problem1, day7Problem2);
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
    (await solution1().then((result) => console.log("Problem 1:", result)));
  solution2 &&
    (await solution2().then((result) => console.log("Problem 2: ", result)));
  console.log("\n");
}
