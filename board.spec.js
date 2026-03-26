import Gameboard from "./modules/gameboard";

test("isHorizontalCorrect() checks if horizontal cordinates are correct", () => {
  let gameboard = new Gameboard();
  expect(gameboard.isHorizontalCorrect([0, 2], 3)).toBeTruthy();
  gameboard.board[0][3] = "ship";
  expect(gameboard.isHorizontalCorrect([0, 2], 3)).toBeFalsy();
  expect(gameboard.isHorizontalCorrect([0, 9], 5)).toBeFalsy();
});

test("isVerticalCorrect() checks if vertical cordinates are correct", () => {
  let gameboard = new Gameboard();
  expect(gameboard.isVerticalCorrect([0, 3], 3)).toBeTruthy();
  expect(gameboard.isVerticalCorrect([0, 9], 5)).toBeTruthy();
  gameboard.board[0][3] = "ship";
  expect(gameboard.isVerticalCorrect([0, 3], 3)).toBeFalsy();
  expect(gameboard.isVerticalCorrect([9, 0], 5)).toBeFalsy();
});

test(`placeShip() should place a ship on the game board if the given cordinates are free and correct`, () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 0], 2, "horizontal");
  expect(gameboard.board[0][0]).not.toBe(null);
  expect(gameboard.board[0][1]).not.toBe(null);
  gameboard.placeShip([1, 0], 2, "vertical");
  expect(gameboard.board[(1, 0)]).not.toBe(null);
  expect(gameboard.board[(2, 0)]).not.toBe(null);
});
