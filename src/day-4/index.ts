import * as path from 'path';
import { readLines } from '../utils';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_4_input.txt');

export async function day4Problem1() {
  const data = readLines<string>(inputPath);

  let overlap = 0;

  for await (const line of data) {
    const [elf1, elf2] = line.split(',');
    if (hasFullOverlap(elf1, elf2)) {
      overlap++;
    }
  }

  return overlap;

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
}

export async function day4Problem2() {
  const data = readLines<string>(inputPath);

  let overlap = 0;

  for await (const line of data) {
    const [elf1, elf2] = line.split(',');
    if (!hasNoOverlap(elf1, elf2)) {
      overlap++;
    }
  }

  return overlap;

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
}
