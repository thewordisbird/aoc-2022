import { sign } from "crypto";
import * as path from "path";
import { readLines } from "../utils";

const inputPath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "day_10_input.txt"
);

export async function day10Problem1() {
  const data = readLines<string>(inputPath);

  let value = 1;
  let cycle = 1;
  let signal: Array<number> = [];

  for await (const instruction of data) {
    if (instruction === "noop") {
      runCycle(1);
    } else {
      const [operation, magnitude] = instruction.split(" ");
      runCycle(2);
      value += parseInt(magnitude);
    }
  }

  function runCycle(cycles: number) {
    for (let i = 0; i < cycles; i++) {
      if (
        cycle === 20 ||
        cycle === 60 ||
        cycle === 100 ||
        cycle === 140 ||
        cycle === 180 ||
        cycle === 220
      ) {
        console.log("push to signal", value, cycle);
        signal.push(cycle * value);
      }
      cycle++;
    }
  }

  return signal.reduce((acc, cur) => acc + cur, 0);
}

export async function day10Problem2() {
  const data = readLines<string>(inputPath);

  // each row on the crt is 40 pixels wide and 6 pixels tall

  let value = 1;
  let cycle = 1;
  let signal: Array<string> = [];

  for await (const instruction of data) {
    if (instruction === "noop") {
      runCycle(1, instruction, 0);
    } else {
      const [operation, magnitude] = instruction.split(" ");
      runCycle(2, operation, parseInt(magnitude));
    }
  }

  function runCycle(cycles: number, operation: string, increment: number) {
    console.log("Start cycle", cycle, "begin executing", operation, increment);
    for (let i = 0; i < cycles; i++) {
      console.log(
        "During cycle",
        cycle,
        "CRT draws pixel in position",
        cycle - 1
      );
      const printPixel = Math.abs(value - (cycle - 1)) <= 1;
      if (cycle % 40 === 0) cycle = 0;
      signal.push(printPixel ? "#" : ".");
      console.log("Current CRT row:", signal.join(""), "\n");

      cycle++;
    }
    value += increment;
    console.log(
      "End of cycle",
      cycle - 1,
      "finish executing",
      operation,
      increment,
      `register X is now at ${value}`,
      "\n"
    );
  }

  function printCRT(signal: string[]) {
    const scaleForCRT: Array<Array<string>> = [];
    for (let i = 0; i < signal.length; i += 40) {
      const row = signal.slice(i, i + 40);
      console.log(row.join(""));
    }
  }

  console.log(signal);
  printCRT([...signal]);
}
