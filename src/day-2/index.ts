import { readFile } from 'fs/promises';
import * as path from 'path';
import { readLines } from '../utils';

const inputPath = path.join(__dirname, '..', '..', 'assets', 'day_2_input.txt');

enum ShapeScore {
  rock = 1,
  paper = 2,
  scissors = 3,
}

enum GameScore {
  win = 6,
  draw = 3,
  lose = 0,
}

enum CodeDecrypt {
  A = 'rock',
  B = 'paper',
  C = 'scissors',
  X = 'rock',
  Y = 'paper',
  Z = 'scissors',
}

enum P2PlayDecrypt {
  rock = 'X',
  paper = 'Y',
  scissors = 'Z',
}
type GamePlay = keyof typeof ShapeScore;

type GameOutcome = keyof typeof GameScore;

type Code = keyof typeof CodeDecrypt;

type P2Code = keyof typeof P2PlayDecrypt;

export async function day2Problem1() {
  const games = readLines<string>(inputPath);
  let score = 0;
  for await (const game of games) {
    score += getGameScore(game);
  }
  return score;
}

export async function day2Promblem2() {
  const games = transformGames(readLines<string>(inputPath));
  let score = 0;
  for await (const game of games) {
    score += getGameScore(game);
  }
  return score;
}

/* helpers */
async function* transformGames(games: AsyncGenerator<string>) {
  for await (const game of games) {
    const [p1Play, _] = game.split(' ');
    yield `${p1Play} ${getPlay(game)}`;
  }
  return;

  function getPlay(game: string): string | undefined {
    const [p1, outcome] = game.split(' ');
    const p1Play: GamePlay = CodeDecrypt[p1 as Code];

    if (outcome === 'X') {
      // need to lose
      if (p1Play === 'rock') return P2PlayDecrypt.scissors;
      if (p1Play === 'paper') return P2PlayDecrypt.rock;
      if (p1Play === 'scissors') return P2PlayDecrypt.paper;
    }

    if (outcome === 'Y') {
      // need to draw
      return P2PlayDecrypt[p1Play];
    }

    if (outcome === 'Z') {
      // need to win
      if (p1Play === 'rock') return P2PlayDecrypt.paper;
      if (p1Play === 'paper') return P2PlayDecrypt.scissors;
      if (p1Play === 'scissors') return P2PlayDecrypt.rock;
    }
  }
}

function getGameScore(game: string) {
  const [p1, p2] = game.split(' ');

  const p1Play: GamePlay = CodeDecrypt[p1 as Code];
  const p2Play: GamePlay = CodeDecrypt[p2 as Code];

  if (p1Play === p2Play) return scoreGame('draw', p2Play);

  if (
    (p1Play === 'rock' && p2Play === 'scissors') ||
    (p1Play === 'paper' && p2Play === 'rock') ||
    (p1Play === 'scissors' && p2Play === 'paper')
  )
    return scoreGame('lose', p2Play);

  if (
    (p1Play === 'rock' && p2Play === 'paper') ||
    (p1Play === 'paper' && p2Play === 'scissors') ||
    (p1Play === 'scissors' && p2Play === 'rock')
  )
    return scoreGame('win', p2Play);

  throw new Error('Invalid game');

  function scoreGame(outcome: GameOutcome, play: GamePlay) {
    return ShapeScore[play] + GameScore[outcome];
  }
}
