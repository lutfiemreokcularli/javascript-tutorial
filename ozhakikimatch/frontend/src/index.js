import Phaser from "phaser";
import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScen.js";
import EndScene from "./scenes/EndScene.js";

const config = {
  type: Phaser.CANVAS,
  width: 1920,
  height: 1080,
  parent: "game",
  scene: [StartScene, GameScene, EndScene],
};

new Phaser.Game(config);
