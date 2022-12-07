import { dir } from "console";
import * as path from "path";
import { readLines } from "../utils";

const inputPath = path.join(__dirname, "..", "..", "assets", "day_7_input.txt");

class FileSystem {
  public name: string;
  public parent: FileSystem | null;
  public dirs: FileSystem[] = [];
  public files: File[] = [];

  constructor(name: string, parent?: FileSystem) {
    this.name = name;
    this.parent = parent || null;
  }

  addDir(dirName: string) {
    // check if dir exists
    const dirExists = this.dirs.filter((cur) => cur.name === dirName).length;
    if (!dirExists) this.dirs.push(new FileSystem(dirName, this));
  }

  addFile(fileSize: string, fileName: string) {
    const fileExists = this.files.filter((cur) => cur.name === fileName).length;
    if (!fileExists) this.files.push(new File(fileSize, fileName, this));
  }

  changeDir(target: string) {
    if (target === "..") return this.parent;
    const result = this.dirs.filter((cur) => cur.name === target);
    return result[0];
  }

  async auditSubs(data: AsyncGenerator<string>) {
    for await (const line of data) {
      const parsedLine = line.split(" ");
      if (parsedLine[0] === "$") return line;

      if (parsedLine[0] === "dir") {
        this.addDir(parsedLine[1]);
      } else {
        // assume file
        this.addFile(parsedLine[0], parsedLine[1]);
      }
    }
  }

  get size(): number {
    const subFileSize = this.files.reduce((acc, cur) => acc + cur.size, 0);
    const subDirSize = this.dirs.reduce((acc, cur) => acc + cur.size, 0);
    return subFileSize + subDirSize;
  }

  get dirsSize(): number {
    return this.dirs.reduce((acc, cur) => acc + cur.size, 0);
  }

  get FilesSize() {
    return this.files.reduce((acc, cur) => acc + cur.size, 0);
  }
}

class File {
  public size: number;
  public name: string;
  public parent: FileSystem;

  constructor(size: string, name: string, parent: FileSystem) {
    this.size = parseInt(size);
    this.name = name;
    this.parent = parent;
  }
}

async function buildFileSystem() {
  // stream file line by line
  const data = readLines<string>(inputPath);
  let baseRoot: FileSystem | null = null;
  let activeRoot: FileSystem | null = null;

  for await (let line of data) {
    const parsedLine = line.split(" ");

    if (parsedLine[0] === "$") {
      // command
      const command = parsedLine[1];
      if (command === "cd") {
        const target = parsedLine[2];
        if (activeRoot) {
          activeRoot = activeRoot.changeDir(target);
        } else {
          if (target === "..") throw new Error("Root Error - CD");
          baseRoot = new FileSystem(target);
          activeRoot = baseRoot;
        }
      }
    } else {
      if (!activeRoot) throw new Error("Root Error - LS");
      if (parsedLine[0] === "dir") {
        activeRoot.addDir(parsedLine[1]);
      } else {
        // assume file
        activeRoot.addFile(parsedLine[0], parsedLine[1]);
      }
    }
  }

  return baseRoot;
}

export async function day7Problem1() {
  const root = await buildFileSystem();

  const maxFileSize = 100000;
  const toDelete: [string, number][] = [];

  if (!root) return 0;
  // build toDelete
  dfs(root);

  return toDelete.reduce((acc, cur) => acc + cur[1], 0);

  function dfs(node: FileSystem) {
    if (node.size <= maxFileSize) {
      toDelete.push([node.name, node.size]);
    }
    for (const dir of node.dirs) dfs(dir);
  }
}

export async function day7Problem2() {
  const root = await buildFileSystem();
  if (!root) throw new Error("Root not set");

  const totalDiskSpace = 70000000;
  const requiredFreeSpace = 30000000;
  const usedSpace = root.size;
  const unusedSpace = totalDiskSpace - usedSpace;
  const needToDelete = requiredFreeSpace - unusedSpace;

  if (needToDelete <= 0) return null;

  const toDelete: [string, number][] = [];

  // build toDelete
  dfs(root);

  toDelete.sort(function sortDirs(a: [string, number], b: [string, number]) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  for (const dir of toDelete) {
    if (dir[1] >= needToDelete) return dir[1];
  }

  function dfs(node: FileSystem) {
    toDelete.push([node.name, node.size]);
    for (const dir of node.dirs) dfs(dir);
  }
}
