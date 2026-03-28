export default class DOMcontroller {
  constructor(gameController) {
    this.gc = gameController;
    this.container = document.querySelector(".gameboard");
    this.container.addEventListener("click", this.handleBoardClick.bind(this));

    this.enemyContainer = document.querySelector(".enemyBoard");
    this.enemyContainer.addEventListener(
      "click",
      this.handleEnemyBoardClick.bind(this),
    );

    this.initPlacmentButtons();
    this.initChangeOrientButton();
    this.initStartButton();
  }

  initStartButton() {
    const button = document.querySelector(".startGameButton");

    const onClick = () => {
      this.gc.hasStarted = true;
    };

    button.addEventListener("click", onClick);
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
    const button = document.querySelector(".changeOrientButton");

    const onClick = () => {
      this.gc.placement.isHorizontal = !this.gc.placement.isHorizontal;
      const span = document.querySelector(".currentOrient");
      const orient = this.gc.placement.isHorizontal ? "horizontal" : "vertical";
      span.textContent = `Now: ${orient}`;
    };

    button.addEventListener("click", onClick);
  }

  updateStartButton() {
    if (this.gc.areAllShipsOnField()) {
      const button = document.querySelector(".startGameButton");
      button.disabled = false;
    }
  }

  handleBoardClick(e) {
    const target = e.target;
    if (!target.classList.contains("cell")) {
      return;
    }

    if (!this.gc.hasStarted) {
      this.placeShip(target);
      this.renderBoard();
      this.updateStartButton();
    }
  }

  renderShipsLeft() {
    const ships = this.gc.shipsLeft;
    for (let i = 2; i <= 5; i++) {
      document.querySelector(`.shipsLeft-${i}`).textContent =
        `left: ${ships[i]}`;
    }
  }

  placeShip(target) {
    const length = parseInt(this.gc.placement.ship);
    if (!this.gc.areShipsLeft(length)) return;
    const cordArr = target.dataset.cord.split(",").map((n) => parseInt(n));
    const isHorizontal = this.gc.placement.isHorizontal;

    if (this.gc.playerOne.board.placeShip(cordArr, length, isHorizontal)) {
      this.gc.decrementShip(length);
      this.renderShipsLeft();
    }
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

  renderBoard(gameboard = this.gc.playerOne.board.board) {
    this.container.innerHTML = "";

    gameboard.forEach((row, i) => {
      row.forEach((cellData, j) => {
        this.container.appendChild(this.createCell(cellData, i, j));
      });
    });
  }

  createEnemyCell(cellData, i, j) {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.cord = `${i},${j}`;

    if (cellData.ship && cellData.isHit) {
      cellDiv.classList.add("ship");
      if (cellData.ship.isSunk()) cellDiv.classList.add("sunk");
    }

    if (cellData.isHit) cellDiv.classList.add("hitted");

    return cellDiv;
  }

  renderEnemyBoard(gameboard = this.gc.playerTwo.board.board) {
    this.enemyContainer.innerHTML = "";

    gameboard.forEach((row, i) => {
      row.forEach((cellData, j) => {
        this.enemyContainer.appendChild(this.createEnemyCell(cellData, i, j));
      });
    });
  }

  handleEnemyBoardClick(e) {
    if (!this.gc.hasStarted) return;
    const target = e.target;
    if (
      !target.classList.contains("cell") ||
      target.classList.contains("hitted")
    ) {
      return;
    }

    this.hitBoard(target);
    this.renderEnemyBoard();
  }
}
