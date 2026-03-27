export default class DOMcontroller {
  constructor(gameController) {
    this.gc = gameController;
    this.container = document.querySelector(".gameboard");
    this.container.addEventListener("click", this.handleBoardClick.bind(this));
  }

  handleBoardClick(e) {
    const target = e.target;
    if (
      !target.classList.contains("cell") ||
      target.classList.contains("hitted")
    ) {
      return;
    }

    const cordArr = target.dataset.cord.split(",");
    this.gc.playTurn(cordArr);

    this.renderBoard();
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
