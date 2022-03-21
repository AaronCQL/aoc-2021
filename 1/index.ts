import * as fs from "fs";
import * as path from "path";

function getInput() {
  const data = fs.readFileSync(path.resolve(__dirname, "in.txt"), {
    encoding: "utf8",
  });
  return data.split("\n").map(Number);
}

function part1() {
  const input: number[] = getInput();

  let ans = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] > input[i]) {
      ans++;
    }
  }

  return ans;
}

function part2() {
  const input: number[] = getInput();

  let ans = 0;
  let sum = input[0] + input[1] + input[2];
  for (let i = 3; i < input.length; i++) {
    const newSum = sum - input[i - 3] + input[i];
    if (newSum > sum) {
      ans++;
    }
  }

  return ans;
}

console.log(part1());
console.log(part2());
