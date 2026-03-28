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

    this.initButtons();
  }

  initButtons() {
    this.initPlacmentButtons();
    this.initChangeOrientButtons();
    this.initStartButton();
    this.initResetButton();
  }

  initResetButton() {
    const resetButton = document.querySelectorAll(".resetGameButton");

    const onClick = () => {
      this.gc.resetGame();
      this.renderBoard();
      this.renderEnemyBoard();
      this.updateShipsLeft();
      this.enableButtons();
      this.updateStartButton();
      this.hideResultDialog();
    };

    resetButton.forEach((button) => {
      button.addEventListener("click", onClick);
    });
  }

  //initRandomPlacementButton() {
  //  const button = document.querySelector(".randomPlacementButton");
  //
  //  const randomPlacement = () => {
  //    if (this.gc.areAllShipsOnField()) return;
  //
  //    this.gc.playerOne.board.generateRandomBoard();
  //    this.gc.shipsLeft = {
  //      5: 0,
  //      4: 0,
  //      3: 0,
  //      2: 0,
  //    };
  //    this.renderBoard();
  //    this.updateShipsLeft();
  //    this.updateStartButton();
  //  };
  //  button.addEventListener("click", randomPlacement);
  //
  //    document.addEventListener("keydown", (e) => {
  //      if (!/q/i.test(e.key)) return;
  //      randomPlacement();
  //    });
  //  }

  initStartButton() {
    const button = document.querySelector(".startGameButton");

    const onClick = () => {
      this.gc.hasStarted = true;
      this.disableButtons();
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

  initChangeOrientButtons() {
    const button = document.querySelector(".changeOrientButton");

    const onClick = () => {
      if (this.gc.hasStarted) return;
      this.gc.placement.isHorizontal = !this.gc.placement.isHorizontal;
      const span = document.querySelector(".currentOrient");
      const orient = this.gc.placement.isHorizontal ? "horizontal" : "vertical";
      span.textContent = `Now: ${orient}`;
    };

    button.addEventListener("click", onClick);

    const onkeydown = (e) => {
      if (/r/i.test(e.key)) onClick();
    };
    document.addEventListener("keydown", onkeydown);
  }

  updateStartButton() {
    if (this.gc.areAllShipsOnField()) {
      const button = document.querySelector(".startGameButton");
      button.disabled = false;
    }
  }

  disableButtons() {
    const randomPlacement = document.querySelector(".randomPlacementButton");
    randomPlacement.disabled = true;
    const buttons = document.querySelectorAll(".placementButtons button");
    buttons.forEach((button) => (button.disabled = true));
  }

  enableButtons() {
    const randomPlacement = document.querySelector(".randomPlacementButton");
    randomPlacement.disabled = false;
    const buttons = document.querySelectorAll(".placementButtons button");
    buttons.forEach((button) => (button.disabled = false));
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

  updateShipsLeft() {
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
      this.updateShipsLeft();
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
    this.checkWinner();
    this.renderEnemyBoard();
  }

  checkWinner() {
    const result = this.gc.checkWinner();
    if (!result) return;

    const dialog = document.querySelector(".endGameDialog");
    dialog.classList.remove("hidden");
    const resultMessage = document.querySelector(".resultMessage");
    resultMessage.textContent = `${result} won`;
  }

  hideResultDialog() {
    const dialog = document.querySelector(".endGameDialog");
    dialog.classList.add("hidden");
  }
}
