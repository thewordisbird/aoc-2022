import * as path from 'path';
import { readLines, groupBySize } from '../utils';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_3_input.txt');

export async function day3Problem1() {
  const data = readLines<string>(inputPath);
  const sharedItems = generateSharedItems();

  let score = 0;
  for await (const sharedItem of sharedItems) {
    score += findItemPriority(sharedItem);
  }

  return score;

  async function* generateSharedItems() {
    for await (const line of data) {
      yield findSharedItem(splitLineInHalf(line));
    }

    function splitLineInHalf(line: string): [string, string] {
      const splitIdx = line.length / 2;
      return [line.slice(0, splitIdx), line.slice(splitIdx)];
    }

    function findSharedItem(tuple: [string, string]) {
      const setOne = new Set(tuple[0].split(''));
      const setTwo = new Set(tuple[1].split(''));
      for (const item of setTwo) {
        if (setOne.has(item)) return item;
      }
      throw new Error('Input error, no matching items');
    }
  }
}

export async function day3Problem2() {
  const data = readLines<string>(inputPath);
  const groups = groupBySize<string>(3, data);

  let score = 0;
  for await (const group of groups) {
    const commonItem = findCommonItem(group);
    const itemPriority = findItemPriority(commonItem);

    score += itemPriority;
  }

  return score;

  function findCommonItem(group: Array<string>) {
    const a = new Set(group[0].split(''));
    const b = new Set(group[1].split(''));
    const c = new Set(group[2].split(''));

    const ab = new Set([...a].filter((x) => b.has(x)));
    const abc = new Set([...ab].filter((y) => c.has(y)));
    const item = [...abc];
    if (!item.length) throw new Error('no common items');

    return item[0];
  }
}

/* helpers */

function findItemPriority(item: string) {
  const isLowerCase = item.toLocaleLowerCase() === item;
  if (isLowerCase) return item.charCodeAt(0) - 96;
  else return item.charCodeAt(0) - 38;
}
