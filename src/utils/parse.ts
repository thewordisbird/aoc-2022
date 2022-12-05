import * as fs from 'fs';
import * as readline from 'readline';

export async function* readLines(filePath: string) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line;
  }
}

export async function* groupBy(groupSize: number, gen: AsyncGenerator) {
  while (true) {
    yield await group();
  }

  async function group() {
    const g = [];
    for await (const item of gen) {
      if (g.length > groupSize) return g;
      g.push(item);
    }
    // handle incomplete group
    return g;
  }
}
