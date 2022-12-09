import * as path from "path";
import { readLines } from "../utils";

const inputPath = path.join(__dirname, "..", "..", "assets", "day_8_input.txt");

export async function day8Problem1() {
  const data = readLines<string>(inputPath);

  const forrest: Array<Array<string>> = [];
  let visCount = 0;

  for await (const line of data) {
    forrest.push(line.split(""));
  }

  for (let i = 0; i < forrest.length; i++) {
    for (let j = 0; j < forrest[i].length; j++) {
      if (lookUp() || lookDown() || lookLeft() || lookRight()) visCount++;
      function lookUp() {
        if (i === 0) return true;
        const height = parseInt(forrest[i][j]);
        for (let w = i - 1; w >= 0; w--) {
          if (parseInt(forrest[w][j]) >= height) return false;
        }
        return true;
      }

      function lookDown() {
        if (i === forrest.length - 1) return true;
        const height = parseInt(forrest[i][j]);
        for (let x = i + 1; x < forrest.length; x++) {
          if (parseInt(forrest[x][j]) >= height) return false;
        }
        return true;
      }

      function lookLeft() {
        if (j === 0) return true;
        const height = parseInt(forrest[i][j]);
        for (let y = j - 1; y >= 0; y--) {
          if (parseInt(forrest[i][y]) >= height) return false;
        }
        return true;
      }

      function lookRight() {
        if (j === forrest[i].length - 1) return true;
        const height = parseInt(forrest[i][j]);
        for (let z = j + 1; z < forrest[i].length; z++) {
          if (parseInt(forrest[i][z]) >= height) return false;
        }
        return true;
      }
    }
  }
  return visCount;
}
export async function day8Problem2() {
  const data = readLines<string>(inputPath);

  const forrest: Array<Array<string>> = [];

  for await (const line of data) {
    forrest.push(line.split(""));
  }

  let maxView = 0;

  for (let i = 0; i < forrest.length; i++) {
    for (let j = 0; j < forrest[i].length; j++) {
      maxView = Math.max(
        maxView,
        lookUp() * lookDown() * lookLeft() * lookRight()
      );
      function lookUp() {
        let view = 0;
        if (i === 0) return view;

        const height = parseInt(forrest[i][j]);
        for (let w = i - 1; w >= 0; w--) {
          if (parseInt(forrest[w][j]) >= height) return ++view;
          view++;
        }
        return view;
      }

      function lookDown() {
        let view = 0;
        if (i === forrest.length - 1) return view;
        const height = parseInt(forrest[i][j]);
        for (let x = i + 1; x < forrest.length; x++) {
          if (parseInt(forrest[x][j]) >= height) return ++view;
          view++;
        }
        return view;
      }

      function lookLeft() {
        let view = 0;
        if (j === 0) return view;
        const height = parseInt(forrest[i][j]);
        for (let y = j - 1; y >= 0; y--) {
          if (parseInt(forrest[i][y]) >= height) return ++view;
          view++;
        }
        return view;
      }

      function lookRight() {
        let view = 0;
        if (j === forrest[i].length - 1) return view;
        const height = parseInt(forrest[i][j]);
        for (let z = j + 1; z < forrest[i].length; z++) {
          if (parseInt(forrest[i][z]) >= height) return ++view;
          view++;
        }
        return view;
      }
    }
  }
  return maxView;
}
