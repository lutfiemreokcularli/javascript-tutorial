import Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }
  init(data) {
    this.finalScore = data.score || 0;
    this.finalCorrect = data.correct || 0;
  }

  preload() {
    this.load.image("end-bg", "/assets/end-bg.png");

    this.load.image("fullscreen", "/assets/images/fullscreen.png");
    this.load.image("smallscreen", "/assets/images/smallscreen.png");
  }

  create() {
    const gameScene = this.scene.get("GameScene");
    if (gameScene.bgMusic && gameScene.bgMusic.isPlaying) {
      gameScene.bgMusic.stop();
    }
    this.add
      .image(960, 540, "end-bg")
      .setOrigin(0.5)
      .setDisplaySize(1920, 1080);

    // ✅ Score ve doğru sayısı
    this.add
      .text(460, 375, `${this.finalScore}`, {
        fontSize: "128px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(460, 750, `${this.finalCorrect}`, {
        fontSize: "128px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    /* const yesBtn = this.add
      .text(800, 900, "JA", {
        fontSize: "70px",
        color: "#00ff00",
        backgroundColor: "#000",
      })
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" }); */

    /* const noBtn = this.add
      .text(1120, 900, "NEIN", {
        fontSize: "70px",
        color: "#ff0000",
        backgroundColor: "rgba(0,0,0,0.1)",
      })
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" }); */

    /* yesBtn.on("pointerdown", () => {
      this.scene.start("StartScene");
    }); */

    /* noBtn.on("pointerdown", () => {
      // Oyunu kapat veya ana menüye dön
      this.game.destroy(true);
    }); */

    // 🔹 Şeffaf rectangle (sadece hitbox için)
    const noBtnArea = this.add
      .rectangle(1600, 725, 350, 150, 0x000000, 0.0) // alpha=0 → görünmez
      .setOrigin(0.5)
      .setAngle(5)
      .setInteractive({ cursor: "pointer" });

    // 🔹 Event
    noBtnArea.on("pointerdown", () => {
      this.game.destroy(true);
    });
    // 🔹 JA butonu hitbox
    const jaBtnArea = this.add
      .rectangle(1150, 725, 350, 150, 0x000000, 0.0) // şeffaf rectangle
      .setOrigin(0.5)
      .setAngle(-5)
      .setInteractive({ cursor: "pointer" });

    // 🔹 Event
    jaBtnArea.on("pointerdown", () => {
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
