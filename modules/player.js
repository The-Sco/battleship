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

    const ships = [4, 3, 3, 2, 2, 2];
    const computerBoard = new Gameboard();
    const randomOrient = () =>
      Math.random() > 0.5 ? "horizontal" : "vertical";
    const randomCord = () => Math.floor(Math.random() * computerBoard.size);
    while (ships.length > 0) {
      const c1 = randomCord();
      const c2 = randomCord();
      if (computerBoard.placeShip([c1, c2], ships[0], randomOrient())) {
        ships.shift();
      }
    }
    return computerBoard;
  }
}
