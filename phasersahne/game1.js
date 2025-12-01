var game = new Phaser.Game(
  window.innerWidth,
  window.innerHeight,
  Phaser.AUTO,
  "phaser-canvas"
);

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
  preload: function () {
    game.load.crossOrigin = "anonymous";
    game.load.image(
      "icon",
      "https://cdn.minticity.com/assets/mintibuch/a1-1/meine-familie/seite-1/junior/1.png"
    );
  },

  create: function () {
    this.rects = [];
    this.images = [];
    this.labels = [];

    this.drawLayout(10);
    this.resize();

    window.addEventListener("resize", () => {
      this.resize();
    });
  },

  drawLayout: function (count) {
    for (let i = 0; i < count; i++) {
      // Arka dikdörtgen (gri zemin)
      const graphics = game.add.graphics(0, 0);
      graphics.beginFill(0x444444);
      graphics.drawRect(0, 0, 10, 10); // placeholder
      graphics.endFill();
      this.rects.push(graphics);

      // Görsel
      const image = game.add.image(0, 0, "icon");
      image.anchor.set(0.5);
      this.images.push(image);

      // Yazı
      const label = game.add.text(0, 0, "📱 Mobile View", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "center",
        wordWrap: true,
        wordWrapWidth: 200,
      });
      label.anchor.set(0.5);
      this.labels.push(label);
    }
  },

  resize: function () {
    const sidebarWidth = 250;
    const w = window.innerWidth - sidebarWidth;
    const h = window.innerHeight;
    game.scale.setGameSize(w, h);

    const isPortrait = h > w;
    const cols = isPortrait ? 2 : 5;
    const rows = isPortrait ? 5 : 2;
    const cellW = w / cols;
    const cellH = h / rows;

    // Eski nesneleri temizle
    for (let i = 0; i < this.rects.length; i++) {
      this.rects[i].destroy();
      this.images[i].destroy();
      this.labels[i].destroy();
    }

    this.rects = [];
    this.images = [];
    this.labels = [];

    // Yeni layout’a göre tekrar oluştur
    for (let i = 0; i < 10; i++) {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const x = c * cellW;
      const y = r * cellH;

      // Arka kutu
      const graphics = game.add.graphics(0, 0);
      graphics.beginFill(0x444444);
      graphics.drawRect(x, y, cellW, cellH);
      graphics.endFill();
      this.rects.push(graphics);

      // Görsel
      const img = game.add.image(x + cellW / 2, y + cellH / 2, "icon");
      img.anchor.set(0.5);

      const scaleX = cellW / img.width;
      const scaleY = cellH / img.height;
      const scale = Math.min(scaleX, scaleY);
      img.scale.setTo(scale, scale);
      this.images.push(img);

      // Yazı
      const label = game.add.text(img.x, img.y, "📱 Mobile View", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "center",
        wordWrap: true,
        wordWrapWidth: cellW * 0.9,
      });
      label.anchor.set(0.5);
      this.labels.push(label);
    }
  },
};

var DesktopState = {
  create: function () {
    const text = game.add.text(
      game.world.centerX,
      game.world.centerY,
      "🖥️ Desktop View",
      {
        font: "32px Arial",
        fill: "#00aaff",
        align: "center",
      }
    );
    text.anchor.set(0.5);

    this.resize = () => {
      const w = window.innerWidth - 250;
      const h = window.innerHeight;
      game.scale.setGameSize(w, h);
      text.x = w / 2;
      text.y = h / 2;
    };

    this.resize();
    window.addEventListener("resize", this.resize);
  },
};

game.state.add("MainState", MainState);
game.state.add("MobileState", MobileState);
game.state.add("DesktopState", DesktopState);
game.state.start("MainState");
