import Gameboard from "./gameboard";
export default class Player {
  constructor(type) {
    this.type = type;
    this.board = this.createGameboard();
  }
  createGameboard() {
    const board = new Gameboard();
    if (this.type === "computer") {
      board.generateRandomBoard();
    }
    return board;
  }

  resetBoard() {
    this.board = this.createGameboard();
  }
}
