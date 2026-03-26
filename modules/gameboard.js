import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
    this.sunkShips = 0;
  }
  placeShip(start, length, orientation) {
    if (orientation == "horizontal") {
      if (this.isHorizontalCorrect(start, length)) {
        this.#placeShip(start, length, orientation);
      }
    } else if (orientation == "vertical") {
      if (this.isVerticalCorrect(start, length)) {
        this.#placeShip(start, length, orientation);
      }
    } else console.log("Wrong cordinates!");
  }

  #placeShip(start, length, orientation) {
    const ship = new Ship(length);
    const [line, col] = start;
    if (orientation == "horizontal") {
      const endCol = col + length - 1;

      for (let i = col; i <= endCol; i++) {
        this.board[line][i] = ship;
      }
    } else {
      const endLine = line + length - 1;
      for (let i = line; i <= endLine; i++) {
        this.board[i][col] = ship;
      }
    }
  }

  isSquareCorrect(cordArr) {
    if (cordArr[0] < 0 || cordArr[0] > 9) return false;
    if (cordArr[1] < 0 || cordArr[1] > 9) return false;
    return true;
  }

  // takes 2 arguments in the form of 2 cordinates - [line, column]
  isHorizontalCorrect(start, length) {
    const [line, col] = start;
    const endCol = col + length - 1;

    if (!this.isSquareCorrect(start) || !this.isSquareCorrect([line, endCol])) {
      return false;
    }

    for (let i = col; i <= endCol; i++) {
      if (this.board[line][i] !== null) return false;
    }

    return true;
  }

  isVerticalCorrect(start, length) {
    const [line, col] = start;
    const endLine = line + length - 1;

    if (!this.isSquareCorrect(start) || !this.isSquareCorrect([endLine, col])) {
      return false;
    }

    for (let i = line; i <= endLine; i++) {
      if (this.board[i][col] !== null) return false;
    }

    return true;
  }

  reciveAttack(cordArr) {
    const [line, col] = cordArr;
    const square = this.board[line][col];
    if (square !== null && square !== "miss") {
      square.hit();
      square.isSunk() ? this.sunkShips++ : null;
    } else square = "miss";
  }

  areAllShipsSunk() {
    return this.sunkShips == 10;
  }
}
