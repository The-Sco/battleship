import Ship from "./ship";

export default class DOMcontroller {
  constructor(gameController) {
    this.gc = gameController;
  }
  renderBoard(gameboard) {
    const container = document.querySelector(".gameboard");
    container.innerHTML = "";
    const onClick = (e) => {
      const target = e.target;
    };

    for (let i = 0; i < gameboard.length; i++) {
      const row = gameboard[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        const cellDiv = document.createElement("div");
        cellDiv.dataset.cord = [i, j];
        cellDiv.classList.add("cell");
        if (cell instanceof Ship) {
          cellDiv.classList.add("ship");
        }

        container.appendChild(cellDiv);
      }
    }
  }
}
