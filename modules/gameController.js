import DOMcontroller from "./DOMcontroller";
import Player from "./player";

export default class GameController {
  constructor() {
    this.DOMcontroller = new DOMcontroller(this);
    this.playerOne = new Player("player");
    this.playerTwo = new Player("computer");
    this.currentPlayer = this.playerTwo;
  }

  playTurn(cordArr) {
    this.currentPlayer.board.reciveAttack(cordArr);
    this.DOMcontroller.renderBoard(this.currentPlayer.board.board);
  }
}
