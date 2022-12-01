/* Day 1 - Problem 1
The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input).

The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and end up with the following list:

1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
This list represents the Calories of the food carried by five Elves:

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

*/
import { readFile } from 'fs/promises';
import * as path from 'path';

const inputPath = path.join(
  __dirname,
  '..',
  '..',
  'assets',
  'day_1',
  'problem1.txt'
);

async function parseInput() {
  try {
    const data = await readFile(inputPath, { encoding: 'utf8' });
    const dataArr = data.split('\n');
    const calLog = dataArr.reduce(
      (arr: Array<number>, cur) => {
        if (cur === '') {
          arr.push(0);
        } else {
          const elfIdx = arr.length - 1;
          const curTotal = arr[elfIdx];
          const newTotal = curTotal + parseInt(cur);
          arr[elfIdx] = newTotal;
        }
        return arr;
      },
      [0]
    );

    calLog.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
    return calLog;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function day_1_problem_1() {
  const calLog = await parseInput();
  const topElfCalCount = calLog[0];
  console.log('Day 1, Problem 1: ', topElfCalCount);
  const topThreeElfs = calLog.splice(0, 3);
  const topThreeElfCalCount = topThreeElfs.reduce((acc, cur) => acc + cur, 0);
  console.log('Day 1, Problem 1: ', topThreeElfCalCount);
}
