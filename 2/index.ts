import * as fs from "fs";
import * as path from "path";

enum Direction {
  FORWARD = "forward",
  DOWN = "down",
  UP = "up",
}

function getInput() {
  const data = fs.readFileSync(path.resolve(__dirname, "in.txt"), {
    encoding: "utf8",
  });

  return data.split("\n");
}

function part1() {
  const input = getInput();

  let hPosition = 0;
  let depth = 0;

  for (const line of input) {
    const [dir, num] = line.split(" ");
    if (dir === Direction.FORWARD) {
      hPosition += Number(num);
    } else if (dir === Direction.DOWN) {
      depth += Number(num);
    } else if (dir === Direction.UP) {
      depth -= Number(num);
    }
  }

  return hPosition * depth;
}

function part2() {
  const input = getInput();

  let aim = 0;
  let hPosition = 0;
  let depth = 0;

  for (const line of input) {
    const [dir, num] = line.split(" ");
    if (dir === Direction.FORWARD) {
      hPosition += Number(num);
      depth += aim * Number(num);
    } else if (dir === Direction.DOWN) {
      aim += Number(num);
    } else if (dir === Direction.UP) {
      aim -= Number(num);
    }
  }

  return hPosition * depth;
}

console.log(part1());
console.log(part2());
