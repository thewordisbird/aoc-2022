import * as path from "path";
import { readLines } from "../utils";

const inputPath = path.join(__dirname, "..", "..", "assets", "day_9_input.txt");

type Direction = "U" | "D" | "L" | "R";

export async function day9Problem1() {
  return;
  console.log("running");
  const data = readLines<string>(inputPath);

  let posHead: [number, number] = [0, 0];
  let posTail: [number, number] = [0, 0];

  let tailPositions: Array<[number, number]> = [[0, 0]];

  for await (const move of data) {
    console.log(move);
    const [direction, steps] = move.split(" ");
    for (let s = 0; s < parseInt(steps); s++) {
      switch (direction) {
        case "U":
          posHead[1] = posHead[1] + 1;
          break;
        case "D":
          posHead[1] = posHead[1] - 1;
          break;
        case "L":
          posHead[0] = posHead[0] - 1;
          break;
        case "R":
          posHead[0] = posHead[0] + 1;
          break;
        default:
          throw new Error("Invalid Direction");
      }
      validateTail(posHead, posTail);
    }
  }
  console.log(tailPositions);
  return tailPositions.length;

  function validateTail(h: [number, number], t: [number, number]) {
    console.log("validating", h, t);

    const slope = (h[1] - t[1]) / (h[0] - t[0]);

    if (Math.abs(h[0] - t[0]) <= 1 && Math.abs(h[1] - t[1]) <= 1) {
      // dont move tail
      console.log(
        "escape",
        Math.abs(h[0] - t[0]),
        Math.abs(h[1] - t[1]),
        Math.abs(h[0] - t[0]) <= 1 && Math.abs(h[1] - t[1]) <= 1
      );
      return;
    }
    // if (Math.abs(h[0] - t[0]) <= 1) return;
    // if (Math.abs(h[1] - t[1]) <= 1) return;

    const newPosTail: [number, number] = [...t];

    if (slope === 0 || slope === -0) {
      if (h[0] > t[0]) {
        // head right of tail
        // move tail to right
        console.log("moveTailRight");
        newPosTail[0] = newPosTail[0] + 1;
        logTailPosition(newPosTail);
      } else {
        // head left of tail
        // move tail to left
        console.log("moveTailLeft");
        newPosTail[0] = newPosTail[0] - 1;
        logTailPosition(newPosTail);
      }

      return;
    }

    if (slope === Infinity || slope === -Infinity) {
      if (h[1] > t[1]) {
        // head above tail
        // move tail up
        console.log("moveTailUp");
        newPosTail[1] = newPosTail[1] + 1;
        logTailPosition(newPosTail);
      } else {
        // head below tail
        // move tail down
        console.log("moveTailDown");
        newPosTail[1] = newPosTail[1] - 1;
        logTailPosition(newPosTail);
      }

      return;
    }

    if (h[0] > posTail[0]) {
      if (h[1] > posTail[1]) {
        // move tail diag r/u
        console.log("moveTailRU");
        newPosTail[0] = newPosTail[0] + 1;
        newPosTail[1] = newPosTail[1] + 1;
        logTailPosition(newPosTail);
      } else {
        // move tail diag r/d
        console.log("moveTailRD");
        newPosTail[0] = newPosTail[0] + 1;
        newPosTail[1] = newPosTail[1] - 1;
        logTailPosition(newPosTail);
      }
      return;
    }

    if (h[0] < posTail[0]) {
      if (h[1] > posTail[1]) {
        // move tail l/u
        console.log("moveTailLU");
        newPosTail[0] = newPosTail[0] - 1;
        newPosTail[1] = newPosTail[1] + 1;
        logTailPosition(newPosTail);
      } else {
        // move tail l/d
        console.log("moveTailLD");
        newPosTail[0] = newPosTail[0] - 1;
        newPosTail[1] = newPosTail[1] - 1;
        logTailPosition(newPosTail);
      }
    }
  }

  function logTailPosition(nt: [number, number]) {
    console.log("logging tail pos", nt);
    if (
      !tailPositions.filter((cur) => cur[0] === nt[0] && cur[1] === nt[1])
        .length
    ) {
      tailPositions.push(nt);
    }
    posTail = [...nt];
  }
}

export async function day9Problem2() {
  const data = readLines<string>(inputPath);

  // let posHead: [number, number] = [0, 0];
  // let posTail: [number, number] = [0, 0];

  const rope: Array<[number, number]> = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  let tailPositions: Array<[number, number]> = [[0, 0]];

  for await (const move of data) {
    // console.log(move);
    const [direction, steps] = move.split(" ");
    for (let s = 0; s < parseInt(steps); s++) {
      switch (direction) {
        case "U":
          rope[0][1] = rope[0][1] + 1;
          break;
        case "D":
          rope[0][1] = rope[0][1] - 1;
          break;
        case "L":
          rope[0][0] = rope[0][0] - 1;
          break;
        case "R":
          rope[0][0] = rope[0][0] + 1;
          break;
        default:
          throw new Error("Invalid Direction");
      }
      for (let r = 0; r < 9; r++) {
        const [t0, t1] = validateTail(rope[r], rope[r + 1], r === 8);
        rope[r + 1][0] = t0;
        rope[r + 1][1] = t1;
      }
      console.log(rope);
    }
  }
  return tailPositions.length;

  function validateTail(
    h: [number, number],
    t: [number, number],
    isTail: boolean
  ) {
    const slope = (h[1] - t[1]) / (h[0] - t[0]);

    if (Math.abs(h[0] - t[0]) <= 1 && Math.abs(h[1] - t[1]) <= 1) return t;

    const newPosTail: [number, number] = [...t];

    if (slope === 0 || slope === -0) {
      if (h[0] > t[0]) {
        // head right of tail
        // move tail to right
        newPosTail[0] = newPosTail[0] + 1;
        return logTailPosition(newPosTail, isTail);
      } else {
        // head left of tail
        // move tail to left
        newPosTail[0] = newPosTail[0] - 1;
        return logTailPosition(newPosTail, isTail);
      }
    }

    if (slope === Infinity || slope === -Infinity) {
      if (h[1] > t[1]) {
        // head above tail
        // move tail up
        newPosTail[1] = newPosTail[1] + 1;
        return logTailPosition(newPosTail, isTail);
      } else {
        // head below tail
        // move tail down
        newPosTail[1] = newPosTail[1] - 1;
        return logTailPosition(newPosTail, isTail);
      }
    }

    if (h[0] > t[0]) {
      if (h[1] > t[1]) {
        // move tail diag r/u
        newPosTail[0] = newPosTail[0] + 1;
        newPosTail[1] = newPosTail[1] + 1;
        return logTailPosition(newPosTail, isTail);
      } else {
        // move tail diag r/d
        newPosTail[0] = newPosTail[0] + 1;
        newPosTail[1] = newPosTail[1] - 1;
        return logTailPosition(newPosTail, isTail);
      }
    }

    if (h[0] < t[0]) {
      if (h[1] > t[1]) {
        // move tail l/u
        newPosTail[0] = newPosTail[0] - 1;
        newPosTail[1] = newPosTail[1] + 1;
        return logTailPosition(newPosTail, isTail);
      } else {
        // move tail l/d
        newPosTail[0] = newPosTail[0] - 1;
        newPosTail[1] = newPosTail[1] - 1;
        return logTailPosition(newPosTail, isTail);
      }
    }

    return t;
  }

  function logTailPosition(nt: [number, number], isTail: boolean) {
    if (
      isTail &&
      !tailPositions.filter((cur) => cur[0] === nt[0] && cur[1] === nt[1])
        .length
    ) {
      tailPositions.push(nt);
    }
    return nt;
  }
}
