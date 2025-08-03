const svgUrl = "assets/background4.svg";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.svg("bg", svgUrl); // SVG'yi yükle
  }

  create() {
    const isMobile =
      this.sys.game.device.os.android || this.sys.game.device.os.iOS;

    if (isMobile) {
      this.scene.start("MobileScene");
    } else {
      this.scene.start("DesktopScene");
    }
  }
}

class MobileScene extends Phaser.Scene {
  constructor() {
    super("MobileScene");
  }

  create() {
    this.bg = this.add.image(0, 0, "bg").setOrigin(0);

    this.text = this.add
      .text(0, 0, "", {
        fontSize: "28px",
        fill: "#00ff00",
        align: "center",
        wordWrap: { useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.updateLayout();

    this.scale.on("resize", (gameSize) => {
      this.cameras.resize(gameSize.width, gameSize.height);
      this.updateLayout();
    });
  }

  updateLayout() {
    const width = this.scale.width;
    const height = this.scale.height;
    const isPortrait = height > width;

    // arka planı tam ekran yay
    this.bg.displayWidth = width;
    this.bg.displayHeight = height;

    this.text.setText(isPortrait ? "📱 Portrait Mode" : "📱 Landscape Mode");
    this.text.setPosition(width / 2, height / 2);
    this.text.setWordWrapWidth(width * 0.9);
  }
}

class DesktopScene extends Phaser.Scene {
  constructor() {
    super("DesktopScene");
  }

  create() {
    this.bg = this.add.image(0, 0, "bg").setOrigin(0);

    this.desktopText = this.add.text(100, 100, "🖥️ Desktop Scene", {
      fontSize: "32px",
      fill: "#0000ff",
    });

    this.updateLayout();

    this.scale.on("resize", (gameSize) => {
      this.cameras.resize(gameSize.width, gameSize.height);
      this.updateLayout();
    });
  }

  updateLayout() {
    const width = this.scale.width;
    const height = this.scale.height;

    // arka planı tam ekran yay
    this.bg.displayWidth = width;
    this.bg.displayHeight = height;
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MainScene, MobileScene, DesktopScene],
  parent: "game-container",
};

const game = new Phaser.Game(config);
