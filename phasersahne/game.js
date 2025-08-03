var game = new Phaser.Game("100", "100", Phaser.AUTO, "phaser-canvas");

var MainState = {
  preload: function () {},

  create: function () {
    var isMobile = this.game.device.android || this.game.device.iOS;

    if (isMobile) {
      this.state.start("MobileState");
    } else {
      this.state.start("DesktopState");
    }
  },
};

var MobileState = {
  create: function () {
    this.label = this.add.text(0, 0, "📱 Mobile View", {
      font: "28px Arial",
      fill: "#00ff00",
      align: "center",
    });
    this.label.anchor.set(0.5);

    this.resize(); // İlk yerleştirme
    window.addEventListener("resize", this.resize.bind(this)); // Resize olayı
  },

  resize: function () {
    var w = window.innerWidth - 250; // sol sidebar genişliği
    var h = window.innerHeight;
    game.scale.setGameSize(w, h);
    this.label.x = w / 2;
    this.label.y = h / 2;
  },
};

var DesktopState = {
  create: function () {
    this.label = this.add.text(0, 0, "🖥️ Desktop View", {
      font: "32px Arial",
      fill: "#00aaff",
      align: "center",
    });
    this.label.anchor.set(0.5);

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  },

  resize: function () {
    var w = window.innerWidth - 250;
    var h = window.innerHeight;
    game.scale.setGameSize(w, h);
    this.label.x = w / 2;
    this.label.y = h / 2;
  },
};

game.state.add("MainState", MainState);
game.state.add("MobileState", MobileState);
game.state.add("DesktopState", DesktopState);
game.state.start("MainState");
