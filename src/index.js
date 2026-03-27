import style from "./style.css";
import DOMcontroller from "../modules/DOMcontroller";
import Player from "../modules/player";

const player = new Player("computer");
const controller = new DOMcontroller();
controller.renderBoard(player.board.board);
