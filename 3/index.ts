import * as fs from "fs";
import * as path from "path";

function getInput() {
  const data = fs.readFileSync(path.resolve(__dirname, "in.txt"), {
    encoding: "utf8",
  });

  return data.split("\n");
}

function part1() {
  const input = getInput();
  const gamma: string[] = [];
  const epsilon: string[] = [];

  for (let i = 0; i < input[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (let j = 0; j < input.length; j++) {
      if (input[j][i] === "0") {
        zeroes++;
      } else {
        ones++;
      }
    }
    if (zeroes > ones) {
      gamma.push("0");
      epsilon.push("1");
    } else {
      gamma.push("1");
      epsilon.push("0");
    }
  }

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

function part2() {
  const input = getInput();

  let oxygen = input.slice();
  let co2 = input.slice();

  for (let i = 0; i < oxygen[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (let j = 0; j < oxygen.length; j++) {
      if (oxygen[j][i] === "0") {
        zeroes++;
      } else {
        ones++;
      }
    }
    const filterBy = zeroes > ones ? "0" : "1";
    oxygen = oxygen.filter((bin) => bin[i] === filterBy);
    if (oxygen.length === 1) {
      break;
    }
  }

  for (let i = 0; i < co2[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (let j = 0; j < co2.length; j++) {
      if (co2[j][i] === "0") {
        zeroes++;
      } else {
        ones++;
      }
    }
    const filterBy = zeroes <= ones ? "0" : "1";
    co2 = co2.filter((bin) => bin[i] === filterBy);
    if (co2.length === 1) {
      break;
    }
  }

  return parseInt(oxygen.join(""), 2) * parseInt(co2.join(""), 2);
}

console.log(part1());
console.log(part2());
