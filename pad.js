export default class InputHandler {
  constructor(pad, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          pad.moveLeft();
          break;

        case 39:
          pad.moveRight();
          break;

        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (pad.speed < 0) pad.stop();
          break;

        case 39:
          if (pad.speed > 0) pad.stop();
          break;
      }
    });
  }
}
