import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image("start-bg", "/assets/start-bg.png");

    this.load.image("fullscreen", "/assets/images/fullscreen.png");
    this.load.image("smallscreen", "/assets/images/smallscreen.png");
  }

  create() {
    this.add
      .image(960, 540, "start-bg")
      .setOrigin(0.5)
      .setDisplaySize(1920, 1080);

    /* // Start butonu için text veya görsel kullanabilirsin
    const startText = this.add
      .text(960, 900, "START", {
        fontSize: "80px",
        color: "#00ff00",
        fontStyle: "bold",
        backgroundColor: "#000",
      })
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" });

    startText.on("pointerdown", () => {
      this.scene.start("GameScene");
    }); */
    const startBtnArea = this.add
      .rectangle(970, 900, 450, 150, 0x000000, 0.0) // şeffaf rectangle
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" });

    // 🔹 Event
    startBtnArea.on("pointerdown", () => {
      this.scene.start("GameScene"); // oyunu yeniden başlatıyoruz
    });

    // Fullscreen toggle butonu
    this.fullscreenBtn = this.add
      .image(1850, 80, this.scale.isFullscreen ? "smallscreen" : "fullscreen")
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .setDepth(5000);

    this.fullscreenBtn.on("pointerdown", () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        this.fullscreenBtn.setTexture("fullscreen");
      } else {
        this.scale.startFullscreen();
        this.fullscreenBtn.setTexture("smallscreen");
      }
    });
    this.add.image(
      1850,
      80,
      this.scale.isFullscreen ? "smallscreen" : "fullscreen"
    );
  }
}
