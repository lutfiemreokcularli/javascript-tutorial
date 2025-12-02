import Phaser from "phaser";
import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScene.js";
import EndScene from "./scenes/EndScene.js";

const config = {
  type: Phaser.CANVAS,
  width: 1920,
  height: 1080,
  parent: "game",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [StartScene, GameScene, EndScene],
};

new Phaser.Game(config);
