import * as fs from 'fs';
import * as readline from 'readline';

export async function* readLines<T>(filePath: string) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line as T;
  }
}
