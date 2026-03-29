import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array(this.size)
      .fill(null)
      .map(() =>
        Array(this.size)
          .fill(null)
          .map(() => ({
            ship: null,
            isHit: false,
          })),
      );
    this.sunkShips = 0;
  }
  placeShip(start, length, isHorizontal) {
    if (isHorizontal) {
      if (this.isHorizontalCorrect(start, length)) {
        this.#placeShip(start, length, isHorizontal);
        return true;
      }
    } else if (!isHorizontal) {
      if (this.isVerticalCorrect(start, length)) {
        this.#placeShip(start, length, isHorizontal);
        return true;
      }
    }
  }

  #placeShip(start, length, isHorizontal) {
    const ship = new Ship(length);
    const [line, col] = start;
    if (isHorizontal) {
      const endCol = col + length - 1;

      for (let i = col; i <= endCol; i++) {
        this.board[line][i].ship = ship;
      }
    } else {
      const endLine = line + length - 1;
      for (let i = line; i <= endLine; i++) {
        this.board[i][col].ship = ship;
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
      if (this.board[line][i].ship !== null) return false;
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
      if (this.board[i][col].ship !== null) return false;
    }

    return true;
  }

  reciveAttack(cordArr) {
    const [line, col] = cordArr;
    const target = this.board[line][col];
    if (target.isHit) return "invalid";

    this.board[line][col].isHit = true;
    if (target.ship instanceof Ship) {
      target.ship.hit();
      if (target.ship.isSunk()) {
        this.sunkShips++;
      }
      return "hit";
    }
    return "miss";
  }

  areAllShipsSunk() {
    return this.sunkShips === 10;
  }

  generateRandomBoard() {
    const ships = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];
    const randomOrient = () => (Math.random() > 0.5 ? true : false);
    const randomCord = () => Math.floor(Math.random() * this.size);
    while (ships.length > 0) {
      const c1 = randomCord();
      const c2 = randomCord();
      if (this.placeShip([c1, c2], ships[0], randomOrient())) {
        ships.shift();
      }
    }
  }
}
