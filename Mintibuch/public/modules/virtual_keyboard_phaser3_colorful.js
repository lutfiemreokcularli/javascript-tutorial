// ✅ Neon Border Shader Destekli Random Renkli Keyboard

class NeonPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  constructor(game) {
    super({
      game,
      fragShader: game.cache.shader.get("neon-border").fragmentSrc,
      uniforms: [
        "uProjectionMatrix",
        "uViewMatrix",
        "uModelMatrix",
        "time",
        "color",
      ],
    });
    this.time = 0;
    this.color = new Float32Array([0.2, 1.0, 0.5]); // varsayılan renk
    this.scene = null;

    // 🔁 LocalStorage kontrolü (renk)
    const saved = localStorage.getItem("neonColor");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          this.color[0] = parsed[0];
          this.color[1] = parsed[1];
          this.color[2] = parsed[2];
        }
      } catch (e) {
        console.warn("Geçersiz kayıtlı renk bilgisi", e);
      }
    }
  }

  onPreRender() {
    this.set1f("time", this.time);
    this.set3f("color", this.color[0], this.color[1], this.color[2]);
  }

  setRandomColor() {
    this.color[0] = Math.random();
    this.color[1] = Math.random();
    this.color[2] = Math.random();

    const hex = Phaser.Display.Color.GetColor(
      this.color[0] * 255,
      this.color[1] * 255,
      this.color[2] * 255
    );

    const hexStr = "#" + hex.toString(16).padStart(6, "0");

    if (this.scene && this.scene.keyLabels) {
      this.scene.keyLabels.forEach((label) => {
        label.setColor(hexStr);
      });
    }

    if (this.scene && this.scene.inputBoxText) {
      this.scene.inputBoxText.setColor(hexStr);
    }
    if (this.scene && this.scene.cursorText) {
      this.scene.cursorText.setColor(hexStr);
    }

    // 💾 Renk bilgisini localStorage'a kaydet
    localStorage.setItem(
      "neonColor",
      JSON.stringify([this.color[0], this.color[1], this.color[2]])
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#FFFFFF",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload,
    create,
    update,
  },
};

let game;
export function startGame() {
  game = new Phaser.Game(config);
}

const keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "ß"],
];

let inputString = "";
let keyboardGroup;
let inputBoxText;
let cursorText;
let lastBlink = 0;
let cursorVisible = true;
let neonPipeline;
let shift = false;

function preload() {
  this.load.glsl("neon-border", "assets/shaders/colorful.frag");
}

function create() {
  neonPipeline = new NeonPipeline(this.sys.game);
  this.renderer.pipelines.add("neon-border", neonPipeline);
  neonPipeline.scene = this;

  keyboardGroup = this.add.group();
  this.keyLabels = [];

  createKeyboard(this);

  this.inputBox = this.add
    .rectangle(this.scale.width / 2, 40, 400, 40, 0x000000, 0)
    .setOrigin(0.5);

  const neonHex2 = Phaser.Display.Color.GetColor(
    neonPipeline.color[0] * 255,
    neonPipeline.color[1] * 255,
    neonPipeline.color[2] * 255
  );
  const neonHexStr2 = "#" + neonHex2.toString(16).padStart(6, "0");

  inputBoxText = this.add
    .text(this.scale.width / 2, 40, inputString, {
      font: "24px Arial",
      color: neonHexStr2,
    })
    .setOrigin(0.5);

  this.inputBoxText = inputBoxText;

  cursorText = this.add
    .text(this.scale.width / 2, 40, "|", {
      font: "24px Arial",
      color: "#39ff14",
    })
    .setOrigin(0.5);

  this.cursorText = cursorText;

  const colorBtn = this.add
    .rectangle(this.scale.width - 80, 40, 100, 40, 0x000000, 0)
    .setInteractive({ cursor: "pointer" })
    .setPipeline("neon-border");

  const colorLabel = this.add
    .text(colorBtn.x, colorBtn.y, "COLOR", {
      font: "18px Arial",
      color: "#39ff14",
    })
    .setOrigin(0.5);

  colorBtn.on("pointerdown", () => {
    neonPipeline.setRandomColor();
  });
}

function updateInputDisplay(scene) {
  inputBoxText.setText(inputString);
  inputBoxText.setX(scene.scale.width / 2);
  cursorText.setX(inputBoxText.x + inputBoxText.width / 2 + 5);
  localStorage.setItem("inputValue", inputString); // 💾 input kaydı
}

function createKeyboard(scene) {
  const ww = scene.scale.width;
  const keySpacing = 8;
  const keyHeight = 60;
  const keyWidth = 60;
  const startY = 100;

  for (let row = 0; row < keys.length; row++) {
    const rowKeys = keys[row];
    const rowWidth = rowKeys.length * (keyWidth + keySpacing);
    const offsetX = (ww - rowWidth) / 2;

    for (let col = 0; col < rowKeys.length; col++) {
      const char = rowKeys[col];
      const centerX = offsetX + col * (keyWidth + keySpacing) + keyWidth / 2;
      const centerY = startY + row * (keyHeight + keySpacing) + keyHeight / 2;

      const rect = scene.add
        .rectangle(centerX, centerY, keyWidth, keyHeight, 0x000000, 0)
        .setPipeline("neon-border")
        .setInteractive({ cursor: "pointer" });

      const keyValue = shift ? char.toUpperCase() : char.toLowerCase();

      const hex = Phaser.Display.Color.GetColor(
        neonPipeline.color[0] * 255,
        neonPipeline.color[1] * 255,
        neonPipeline.color[2] * 255
      );

      const label = scene.add
        .text(centerX, centerY, keyValue, {
          font: "22px Arial",
          color: "#" + hex.toString(16).padStart(6, "0"),
        })
        .setOrigin(0.5);

      rect.on("pointerdown", () => {
        inputString += keyValue;
        updateInputDisplay(scene);
      });

      scene.keyLabels.push(label);
      keyboardGroup.add(rect);
      keyboardGroup.add(label);
    }
  }

  const btns = [
    { label: "SHIFT", func: onShift, width: keyWidth * 1.5 },
    { label: "SPACE", func: onSpace, width: keyWidth * 4 },
    { label: "ENTER", func: onEnter, width: keyWidth * 2 },
    { label: "←", func: onBackspace, width: keyWidth * 1.5 },
  ];

  const y = startY + keys.length * (keyHeight + keySpacing);
  const totalW = btns.reduce((sum, b) => sum + b.width + keySpacing, 0);
  let offsetX = (scene.scale.width - totalW + keySpacing) / 2;
  let x = offsetX;

  btns.forEach((btn) => {
    const rect = scene.add
      .rectangle(
        x + btn.width / 2,
        y + keyHeight / 2,
        btn.width,
        keyHeight,
        0x000000,
        0
      )
      .setPipeline("neon-border")
      .setInteractive({ cursor: "pointer" });

    const fontSize = Math.min(
      22,
      Math.floor((btn.width * 0.9) / btn.label.length)
    );

    const hex = Phaser.Display.Color.GetColor(
      neonPipeline.color[0] * 255,
      neonPipeline.color[1] * 255,
      neonPipeline.color[2] * 255
    );

    const label = scene.add
      .text(rect.x, rect.y, btn.label, {
        font: `${fontSize}px Arial`,
        color: "#" + hex.toString(16).padStart(6, "0"),
      })
      .setOrigin(0.5);

    rect.on("pointerdown", () => btn.func(scene));

    scene.keyLabels.push(label);
    keyboardGroup.add(rect);
    keyboardGroup.add(label);

    x += btn.width + keySpacing;
  });
}

function onBackspace(scene) {
  inputString = inputString.slice(0, -1);
  updateInputDisplay(scene);
}

function onEnter(scene) {
  inputString += "\n";
  updateInputDisplay(scene);
}

function onSpace(scene) {
  inputString += " ";
  updateInputDisplay(scene);
}

function onShift(scene) {
  shift = !shift;
  keyboardGroup.clear(true, true);
  scene.keyLabels = [];
  createKeyboard(scene);
}

function update(time, delta) {
  if (time - lastBlink > 500) {
    cursorVisible = !cursorVisible;
    lastBlink = time;
    cursorText.setVisible(cursorVisible);
  }
  neonPipeline.time += delta * 0.001;
}
