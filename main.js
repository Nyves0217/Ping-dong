import { pad, inphand } from "/src/padinp";
import { brk, ball } from "/src/brkball";

import { buildlvl, lvl1, lvl2 } from "/src/lvls";

const state = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWlvl: 4
};

export default class Game {
  constructor(bredth, length, brksPerRow) {
    this.bredth = bredth;
    this.length = length;
    this.state = state.MENU;
    this.ball = new ball(this);
    this.pad = new pad(this);
    this.gameObjects = [];
    this.brks = [];
    this.lives = 3;

    this.lvls = [lvl1, lvl2];
    this.currentlvl = 0;

    new inphand(this.pad, this);
  }

  start() {
    if (
      this.state !== state.MENU &&
      this.state !== state.NEWlvl
    )
      return;

    this.brks = buildlvl(this, this.lvls[this.currentlvl]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.pad];

    this.state = state.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.state = state.GAMEOVER;

    if (
      this.state === state.PAUSED ||
      this.state === state.MENU ||
      this.state === state.GAMEOVER
    )
      return;

    if (this.brks.length === 0) {
      this.currentlvl++;
      this.state = state.NEWlvl;
      this.start();
    }

    [...this.gameObjects, ...this.brks].forEach(object =>
      object.update(deltaTime)
    );

    this.brks = this.brks.filter(brk => !brk.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.brks].forEach(object => object.draw(ctx));

    if (this.state === state.PAUSED) {
      ctx.rect(0, 0, this.bredth, this.length);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.bredth / 2, this.length / 2);
    }

    if (this.state === state.MENU) {
      ctx.rect(0, 0, this.bredth, this.length);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR To Start",
        this.bredth / 2,
        this.length / 2
      );
    }
    if (this.state === state.GAMEOVER) {
      ctx.rect(0, 0, this.bredth, this.length);
      ctx.fillStyle = "rgba(0,0,4,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.bredth / 2, this.length / 2);
    }
  }

  togglePause() {
    if (this.state == state.PAUSED) {
      this.state = state.RUNNING;
    } else {
      this.state = state.PAUSED;
    }
  }
}

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const b = 800;
const l = 600;

let game = new Game(b, l);

let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, b, l);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
