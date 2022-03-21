import * as fs from "fs";
import * as path from "path";

function getInput() {
  const data = fs.readFileSync(path.resolve(__dirname, "in.txt"), {
    encoding: "utf8",
  });

  const [numbers, ...boards] = data.split("\n\n");

  return {
    numbers: numbers.split(","),
    boards: boards.map((board) =>
      board.split("\n").map((row) => row.trim().split(/\s+/g))
    ),
  };
}

function transpose(board: any[][]): any[][] {
  return board[0].map((_, i) => board.map((row) => row[i]));
}

function isWinningBoard(board: boolean[][]): boolean {
  for (const row of board) {
    const isWinningRow = row.reduce((a, b) => a && b);
    if (isWinningRow) {
      return true;
    }
  }

  for (const row of transpose(board)) {
    const isWinningRow = row.reduce((a, b) => a && b);
    if (isWinningRow) {
      return true;
    }
  }

  return false;
}

function getNumbersNeededAndScore(numbers: string[], board: string[][]) {
  const pos: Record<string, [number, number]> = {};
  board.forEach((row, rowIdx) =>
    row.forEach((num, colIdx) => {
      pos[num] = [rowIdx, colIdx];
    })
  );

  const booleanBoard: boolean[][] = board.map((row) => row.map(() => false));
  let numbersNeeded = 0;
  let lastNumCalled = 0;
  for (const num of numbers) {
    numbersNeeded++;
    if (!pos[num]) {
      continue;
    }
    const [rowIdx, colIdx] = pos[num];
    booleanBoard[rowIdx][colIdx] = true;
    if (isWinningBoard(booleanBoard)) {
      lastNumCalled = Number(num);
      break;
    }
  }

  let unmarkedSum = 0;
  for (let i = 0; i < booleanBoard[0].length; i++) {
    for (let j = 0; j < booleanBoard.length; j++) {
      if (!booleanBoard[i][j]) {
        unmarkedSum += Number(board[i][j]);
      }
    }
  }

  return {
    numbersNeeded,
    score: unmarkedSum * lastNumCalled,
  };
}

function part1() {
  const { numbers, boards } = getInput();

  const info = boards.map((board) => getNumbersNeededAndScore(numbers, board));
  const minNumbersRequired = Math.min(
    ...info.map(({ numbersNeeded }) => numbersNeeded)
  );
  const { score } = info.find(
    ({ numbersNeeded }) => minNumbersRequired === numbersNeeded
  );

  return score;
}

function part2() {
  const { numbers, boards } = getInput();

  const info = boards.map((board) => getNumbersNeededAndScore(numbers, board));
  const maxNumbersRequired = Math.max(
    ...info.map(({ numbersNeeded }) => numbersNeeded)
  );
  const { score } = info.find(
    ({ numbersNeeded }) => maxNumbersRequired === numbersNeeded
  );

  return score;
}

console.log(part1());
console.log(part2());
