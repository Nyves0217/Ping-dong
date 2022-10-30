import brk from "/src/brk";

export function buildLevel(game, level) {
  let brks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brk, brkIndex) => {
      if (brk === 1) {
        let position = {
          x: 80 * brkIndex,
          y: 75 + 24 * rowIndex
        };
        brks.push(new brk(game, position));
      }
    });
  });

  return brks;
}

export const level1 = [
  // [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

export const level2 = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
