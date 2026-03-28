import DOMcontroller from "./DOMcontroller";
import Player from "./player";

export default class GameController {
  constructor() {
    this.DOMcontroller = new DOMcontroller(this);
    this.playerOne = new Player("player");
    this.playerTwo = new Player("computer");
    this.currentPlayer = this.playerOne;

    this.hasStarted = false;
    this.placement = {
      ship: 5,
      isHorizontal: true,
    };
    this.shipsLeft = {
      5: 1,
      4: 2,
      3: 3,
      2: 4,
    };
  }

  playTurn(cordArr) {
    this.currentPlayer.board.reciveAttack(cordArr);
    this.DOMcontroller.renderBoard(this.currentPlayer.board.board);
  }

  areShipsLeft(length) {
    return this.shipsLeft[length] > 0;
  }
  decrementShip(length) {
    this.shipsLeft[length]--;
  }
}
