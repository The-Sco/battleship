import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.size = 7;
    this.board = Array.from({ length: this.size }, () =>
      new Array(this.size).fill(null),
    );
    this.sunkShips = 0;
  }
  placeShip(start, length, orientation) {
    if (orientation == "horizontal") {
      if (this.isHorizontalCorrect(start, length)) {
        this.#placeShip(start, length, orientation);
        return true;
      }
    } else if (orientation == "vertical") {
      if (this.isVerticalCorrect(start, length)) {
        this.#placeShip(start, length, orientation);
        return true;
      }
    }
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
    if (cordArr[0] < 0 || cordArr[0] > this.size - 1) return false;
    if (cordArr[1] < 0 || cordArr[1] > this.size - 1) return false;
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
    const target = this.board[line][col];

    if (target instanceof Ship) {
      target.hit();
      if (target.isSunk()) {
        this.sunkShips++;
      }
    } else if (target === null) {
      this.board[line][col] = "miss";
    }
  }
}
