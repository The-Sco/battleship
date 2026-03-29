import DOMcontroller from "./DOMcontroller";
import Player from "./player";

export default class GameController {
  constructor() {
    this.DOMcontroller = new DOMcontroller(this);
    this.playerOne = new Player("player");
    this.playerTwo = new Player("computer");
    this.currentPlayer = "player";

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
    if (this.currentPlayer !== "player") return;
    this.playerTurn(cordArr);
    this.DOMcontroller.renderEnemyBoard();
    setTimeout(() => {
      this.computersTurn();
      this.DOMcontroller.renderBoard();
    }, 700);
  }

  playerTurn(cordArr) {
    this.playerTwo.board.reciveAttack(cordArr);
    this.currentPlayer = "computer";
  }

  computersTurn() {
    const randomCord = () =>
      Math.floor(Math.random() * this.playerOne.board.size);
    let c1 = randomCord();
    let c2 = randomCord();
    let turn = this.playerOne.board.reciveAttack([c1, c2]);
    while (turn === "invalid") {
      c1 = randomCord();
      c2 = randomCord();
      turn = this.playerOne.board.reciveAttack([c1, c2]);
    }
    this.currentPlayer = "player";
  }

  areShipsLeft(length) {
    return this.shipsLeft[length] > 0;
  }
  decrementShip(length) {
    this.shipsLeft[length]--;
  }

  areAllShipsOnField() {
    let sum = 0;
    for (let i in this.shipsLeft) {
      sum += this.shipsLeft[i];
    }
    return sum <= 0;
  }

  checkWinner() {
    if (this.playerTwo.board.areAllShipsSunk()) {
      return "You";
    } else if (this.playerOne.board.areAllShipsSunk()) {
      return "Computer";
    }
    return false;
  }

  resetGame() {
    this.currentPlayer = "player";
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
    this.playerOne.resetBoard();
    this.playerTwo.resetBoard();
  }
}
