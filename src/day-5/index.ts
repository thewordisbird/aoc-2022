import * as path from 'path';
import { readLines } from '../utils';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_5_input.txt');

export async function day5Problem1() {
  const data = readLines<string>(inputPath);
  const stacks = await createStacks(data);

  // This should have the cursor of the generator for data set to process the moves

  for await (const instruction of data) {
    const [_i, count, _j, target, _k, destination] = instruction.split(' ');
    for (let i = 0; i < parseInt(count); i++) {
      const crate = stacks[parseInt(target) - 1].pop();
      stacks[parseInt(destination) - 1].push(crate as string);
    }
  }

  return getCode(stacks);

  function getCode(stacks: Array<Array<string>>) {
    return stacks.reduce((acc, cur) => acc + cur.pop(), '');
  }
  async function createStacks(data: AsyncGenerator<string>) {
    const stacks: Array<Array<string>> = [];
    for await (const row of data) {
      if (row === '') return stacks;
      // each stack is represented by '[X]' taking up 3 spaces
      // there is one space between each stack
      let idx = 1;
      while (idx < row.length - 1) {
        if (row[idx] === ' ') {
          // go to next column
          idx += 4;
        } else {
          const label = row[idx];
          const stackId = (idx - 1) / 4;
          while (stackId > stacks.length - 1) {
            stacks.push([]);
          }

          stacks[stackId].unshift(label);
          idx += 4;
        }
      }
    }
    return stacks;
  }
}

export async function day5Problem2() {
  const data = readLines<string>(inputPath);
  const stacks = await createStacks(data);

  // This should have the cursor of the generator for data set to process the moves

  for await (const instruction of data) {
    const [_i, count, _j, target, _k, destination] = instruction.split(' ');
    const tmpStack = [];
    for (let i = 0; i < parseInt(count); i++) {
      const crate = stacks[parseInt(target) - 1].pop();
      tmpStack.push(crate as string);
    }

    while (tmpStack.length) {
      stacks[parseInt(destination) - 1].push(tmpStack.pop() as string);
    }
  }

  return getCode(stacks);

  function getCode(stacks: Array<Array<string>>) {
    return stacks.reduce((acc, cur) => acc + cur.pop(), '');
  }
  async function createStacks(data: AsyncGenerator<string>) {
    const stacks: Array<Array<string>> = [];
    for await (const row of data) {
      if (row === '') return stacks;
      // each stack is represented by '[X]' taking up 3 spaces
      // there is one space between each stack
      let idx = 1;
      while (idx < row.length - 1) {
        if (row[idx] === ' ') {
          // go to next column
          idx += 4;
        } else {
          const label = row[idx];
          const stackId = (idx - 1) / 4;
          while (stackId > stacks.length - 1) {
            stacks.push([]);
          }

          stacks[stackId].unshift(label);
          idx += 4;
        }
      }
    }
    return stacks;
  }
}
