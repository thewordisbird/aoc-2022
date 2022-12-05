import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_4_input.txt');

async function inputLines() {
  return readline.createInterface({
    input: fs.createReadStream(inputPath),
  });
}

export async function d4SolutionA() {
  // parse file line by line
  const lines = await inputLines();

  let overlap = 0;
  let noOverlap = 0;

  for await (const line of lines) {
    const [elf1, elf2] = line.split(',');
    if (hasFullOverlap(elf1, elf2)) {
      overlap = overlap + 1;
    } else {
      noOverlap = noOverlap + 1;
    }
  }

  function hasFullOverlap(elf1: string, elf2: string) {
    const [elf1Min, elf1Max] = elf1.split('-');
    const [elf2Min, elf2Max] = elf2.split('-');

    if (
      (parseInt(elf1Min) <= parseInt(elf2Min) &&
        parseInt(elf1Max) >= parseInt(elf2Max)) ||
      (parseInt(elf1Min) >= parseInt(elf2Min) &&
        parseInt(elf1Max) <= parseInt(elf2Max))
    )
      return true;

    return false;
  }

  console.log(overlap, noOverlap, overlap + noOverlap);

  return overlap;
}

export async function d4SolutionB() {
  // parse file line by line
  const lines = await inputLines();

  let overlap = 0;
  let noOverlap = 0;

  for await (const line of lines) {
    const [elf1, elf2] = line.split(',');
    if (hasNoOverlap(elf1, elf2)) {
      noOverlap = noOverlap + 1;
    } else {
      overlap = overlap + 1;
    }
  }

  function hasNoOverlap(elf1: string, elf2: string) {
    const [elf1Min, elf1Max] = elf1.split('-');
    const [elf2Min, elf2Max] = elf2.split('-');

    if (
      parseInt(elf1Max) < parseInt(elf2Min) ||
      parseInt(elf1Min) > parseInt(elf2Max)
    )
      return true;

    return false;
  }

  console.log(overlap, noOverlap, overlap + noOverlap);

  return noOverlap;
}
