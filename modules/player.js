import Gameboard from "./gameboard";
export default class Player {
  constructor(type) {
    this.type = type;
    this.board = new Gameboard();
  }
  createGameboard() {
    if (this.type === "player") {
      return new Gameboard();
    }

    const ships = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];
    const ComputerBoard = new Gameboard();
    const randomOrient = () =>
      Math.random() > 0.5 ? "horizontal" : "vertical";
    const randomCord = () => Math.floor(Math.random() * 10);
    while (ships.length > 0) {
      if (
        ComputerBoard.placeShip(
          [randomCord(), randomCord()],
          ships[0],
          randomOrient(),
        )
      ) {
        ships.shift();
      }
    }
    return ComputerBoard;
  }
}
