import style from "./style.css";
import GameController from "../modules/gameController";

const controller = new GameController();
controller.DOMcontroller.renderBoard();
controller.DOMcontroller.renderEnemyBoard();
