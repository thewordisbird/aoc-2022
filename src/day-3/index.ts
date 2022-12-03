// parse file by line
// splice each line in half
// find the common char in each pair
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_3_input.txt');

async function inputLines() {
  return readline.createInterface({
    input: fs.createReadStream(inputPath),
  });
}

export async function partOneSolution() {
  function processLine(line: string) {
    function splitLineInHalf(): [string, string] {
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

    function findItemPriority(item: string) {
      const isLowerCase = item.toLocaleLowerCase() === item;
      if (isLowerCase) return item.charCodeAt(0) - 96;
      else return item.charCodeAt(0) - 38;
    }

    const lineTuple = splitLineInHalf();
    const sharedItem = findSharedItem(lineTuple);
    const result = findItemPriority(sharedItem);
    return result;
  }

  let score = 0;

  const lines = await inputLines();
  for await (const line of lines) {
    score = score + processLine(line);
  }
  return score;
}

export async function partTwoSolution() {
  // group lines by 3 -> [str-a, str-b, str-c]
  // find common item
  // find item priority
  // add priority to score

  const groupedItems: Array<Array<string>> = [];
  const lines = await inputLines();
  for await (const line of lines) {
    let bucket = groupedItems.length - 1;
    if (bucket === -1) {
      groupedItems.push([]);
      bucket++;
    }
    if (groupedItems[bucket].length > 2) {
      groupedItems.push([]);
      bucket++;
    }
    groupedItems[bucket].push(line);
  }

  let score = 0;
  for (const groupItem of groupedItems) {
    console.log('groupItem: ', groupItem);
    const commonItem = findCommonItem(groupItem);
    console.log('commonItem: ', commonItem);
    const itemPriority = findItemPriority(commonItem);
    console.log('itemPriority: ', itemPriority);
    score = score + itemPriority;
  }

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

  function findItemPriority(item: string) {
    const isLowerCase = item.toLocaleLowerCase() === item;
    if (isLowerCase) return item.charCodeAt(0) - 96;
    else return item.charCodeAt(0) - 38;
  }

  return score;
}
