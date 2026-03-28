export default class DOMcontroller {
  constructor(gameController) {
    this.gc = gameController;
    this.container = document.querySelector(".gameboard");
    this.container.addEventListener("click", this.handleBoardClick.bind(this));

    this.initPlacmentButtons();
    this.initChangeOrientButton();
  }

  initPlacmentButtons() {
    const placeButtonsDiv = document.querySelector(".placementButtons");

    const onClick = (e) => {
      const target = e.target;
      if (!target.classList.contains("placementButton")) return;
      this.gc.placement.ship = parseInt(target.dataset.length);
    };

    placeButtonsDiv.addEventListener("click", onClick);
  }

  initChangeOrientButton() {
    const button = document.querySelector(".changeOrient");

    const onClick = () => {
      this.gc.placement.isHorizontal = !this.gc.placement.isHorizontal;
    };

    button.addEventListener("click", onClick);
  }

  handleBoardClick(e) {
    const target = e.target;
    if (
      !target.classList.contains("cell") ||
      target.classList.contains("hitted")
    ) {
      return;
    }

    if (this.gc.hasStarted) {
      this.hitBoard(target);
      this.renderBoard();
      return;
    } else {
      this.placeShip(target);
      this.renderBoard();
    }
  }

  placeShip(target) {
    const length = parseInt(this.gc.placement.ship);
    if (!this.gc.areShipsLeft(length)) return;
    const cordArr = target.dataset.cord.split(",").map((n) => parseInt(n));
    const isHorizontal = this.gc.placement.isHorizontal;

    if (this.gc.currentPlayer.board.placeShip(cordArr, length, isHorizontal))
      this.gc.decrementShip(length);
  }

  hitBoard(target) {
    const cordArr = target.dataset.cord.split(",");
    this.gc.playTurn(cordArr);
  }

  createCell(cellData, i, j) {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.cord = `${i},${j}`;

    if (cellData.ship) {
      cellDiv.classList.add("ship");
      if (cellData.ship.isSunk()) cellDiv.classList.add("sunk");
    }

    if (cellData.isHit) cellDiv.classList.add("hitted");

    return cellDiv;
  }

  renderBoard(gameboard = this.gc.currentPlayer.board.board) {
    this.container.innerHTML = "";

    gameboard.forEach((row, i) => {
      row.forEach((cellData, j) => {
        this.container.appendChild(this.createCell(cellData, i, j));
      });
    });
  }
}
