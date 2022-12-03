import { readFile } from "fs/promises";
import * as path from "path";

const inputPath = path.join(__dirname, "..", "..", "assets", "day_2_input.txt");

const shapeScoreMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const codeDecrypt = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const p2PlayDecrypt = {
  rock: "X",
  paper: "Y",
  scissors: "Z",
};

function getGameScore(game: string) {
  const [p1, p2] = game.split(" ");

  const p1Play = (codeDecrypt as any)[p1];
  const p2Play = (codeDecrypt as any)[p2];

  if (p1Play === "rock" && p2Play === "scissors") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 0;
    return shapeScore + gameScore;
  }
  if (p1Play === "rock" && p2Play === "paper") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 6;
    return shapeScore + gameScore;
  }
  if (p1Play === "rock" && p2Play === "rock") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 3;
    return shapeScore + gameScore;
  }

  if (p1Play === "paper" && p2Play === "scissors") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 6;
    return shapeScore + gameScore;
  }
  if (p1Play === "paper" && p2Play === "paper") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 3;
    return shapeScore + gameScore;
  }
  if (p1Play === "paper" && p2Play === "rock") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 0;
    return shapeScore + gameScore;
  }

  if (p1Play === "scissors" && p2Play === "scissors") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 3;
    return shapeScore + gameScore;
  }
  if (p1Play === "scissors" && p2Play === "paper") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 0;
    return shapeScore + gameScore;
  }
  if (p1Play === "scissors" && p2Play === "rock") {
    const shapeScore: number = (shapeScoreMap as any)[p2Play];
    const gameScore = 6;
    return shapeScore + gameScore;
  }
  return 0;
}

function getPlay(game: string): string | undefined {
  const [p1, outcome] = game.split(" "); // <'A' | 'B' | 'C'> <'X' | 'Y' | 'Z'>
  const p1Play: "rock" | "paper" | "scissors" = (codeDecrypt as any)[p1]; // 'rock' | 'paper' | 'scissors

  if (outcome === "X") {
    // need to lose
    if (p1Play === "rock") return p2PlayDecrypt["scissors"];
    if (p1Play === "paper") return p2PlayDecrypt["rock"];
    if (p1Play === "scissors") return p2PlayDecrypt["paper"];
  }

  if (outcome === "Y") {
    // need to draw
    return p2PlayDecrypt[p1Play];
  }

  if (outcome === "Z") {
    // need to win
    if (p1Play === "rock") return p2PlayDecrypt["paper"];
    if (p1Play === "paper") return p2PlayDecrypt["scissors"];
    if (p1Play === "scissors") return p2PlayDecrypt["rock"];
  }
}

async function parseInput() {
  try {
    const data = await readFile(inputPath, { encoding: "utf8" });
    return data.split("\n");
  } catch (err) {}
}

export async function day_2_problem_1() {
  const data = await parseInput();
  const score = (data as []).reduce((acc, cur) => {
    return acc + getGameScore(cur);
  }, 0);
  console.log("RPS Score: ", score);
}

export async function day_2_problem_2() {
  const data = await parseInput(); // <'A' | 'B' | 'C'> <'X' | 'Y' | 'Z'>[]
  const games = (data as string[]).map((cur) => {
    const [p1Play, outcome] = cur.split(" ");
    return `${p1Play} ${getPlay(cur)}`;
  });
  console.log(games);
  const score = games.reduce((acc, cur) => {
    return acc + getGameScore(cur);
  }, 0);
  console.log("RPS Score: ", score);
}
