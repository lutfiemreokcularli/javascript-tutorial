class NeonPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  constructor(game) {
    super({
      game,
      fragShader: game.cache.shader.get("neon-border").fragmentSrc,
      uniforms: [
        "uProjectionMatrix",
        "uViewMatrix",
        "uModelMatrix",
        "resolution",
        "time",
      ],
    });

    this.time = 0;
    this.resolution = new Float32Array([1, 1]);
  }

  onPreRender() {
    this.set1f("time", this.time);
    this.set2f("resolution", this.resolution[0], this.resolution[1]);
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload,
    create,
    update,
    resize,
  },
};

let game;
export function startGame() {
  game = new Phaser.Game(config);
}

let inputString = "";
let keyboardGroup;
let inputBox;
let inputBoxText;
let cursorText;
let shift = false;
let cursorVisible = true;
let lastBlink = 0;
let keyWidth, keyHeight, keySpacing, inputBoxWidth, inputBoxHeight;

const keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "ß"],
];

function preload() {
  this.load.glsl("neon-border", "assets/shaders/neonBorder.frag");
}

function create() {
  this.neonPipelines = {};
  keyboardGroup = this.add.group();
  createLayout(this);

  this.input.on("pointerdown", (pointer) => {
    const { x, y } = pointer;
    if (Phaser.Geom.Rectangle.Contains(inputBox.getBounds(), x, y)) return;

    let found = false;
    keyboardGroup.getChildren().forEach((child) => {
      if (
        child.getBounds &&
        Phaser.Geom.Rectangle.Contains(child.getBounds(), x, y)
      ) {
        found = true;
      }
    });

    if (!found) keyboardGroup.toggleVisible(false);
  });

  updateInputDisplay();
}

function resize() {
  if (game.scene.scenes[0]) {
    createLayout(game.scene.scenes[0]);
    updateInputDisplay();
  }
}

function createLayout(scene) {
  const ww = scene.scale.width;
  const wh = scene.scale.height;

  const maxKeysInRow = Math.max(...keys.map((row) => row.length));
  keySpacing = Math.max(6, Math.floor(ww * 0.005));
  keyWidth = Math.floor((ww - (maxKeysInRow + 1) * keySpacing) / maxKeysInRow);
  keyHeight = Math.max(Math.floor(wh * 0.08), 38);

  inputBoxWidth = Math.max(Math.floor(ww * 0.75), 220);
  inputBoxHeight = Math.max(Math.floor(wh * 0.09), 38);

  if (inputBox) inputBox.destroy();
  if (inputBoxText) inputBoxText.destroy();
  if (cursorText) cursorText.destroy();
  if (keyboardGroup) keyboardGroup.clear(true, true);

  inputBox = scene.add
    .rectangle(
      ww / 2,
      keySpacing + inputBoxHeight / 2,
      inputBoxWidth,
      inputBoxHeight,
      0x000000
    )
    .setStrokeStyle(2, 0x222222)
    .setOrigin(0.5)
    .setInteractive({ cursor: "pointer" });

  inputBoxText = scene.add
    .text(ww / 2, keySpacing + inputBoxHeight / 2, "", {
      font: `${Math.floor(keyHeight * 0.5)}px Arial`,
      color: "#39ff14",
    })
    .setOrigin(0.5);

  cursorText = scene.add
    .text(ww / 2, keySpacing + inputBoxHeight / 2, "|", {
      font: `${Math.floor(keyHeight * 0.5)}px Arial`,
      color: "#39ff14",
    })
    .setOrigin(0.5);

  inputBox.on("pointerdown", openKeyboard, scene);

  keyboardGroup = scene.add.group();
  drawKeyboard(scene);
  keyboardGroup.toggleVisible(false);
}

function openKeyboard() {
  keyboardGroup.toggleVisible(true);
}

function drawKeyboard(scene) {
  keyboardGroup.clear(true, true);
  scene.neonPipelines = {};

  const ww = scene.scale.width;
  const startY = keySpacing * 2 + inputBoxHeight;

  for (let row = 0; row < keys.length; row++) {
    const rowKeys = keys[row];
    const rowWidth = rowKeys.length * (keyWidth + keySpacing);
    const offsetX = (ww - rowWidth) / 2;

    for (let col = 0; col < rowKeys.length; col++) {
      const x = offsetX + col * (keyWidth + keySpacing);
      const y = startY + row * (keyHeight + keySpacing);
      const char = rowKeys[col];
      addKeyButton(scene, x, y, char);
    }
  }

  const y = startY + keys.length * (keyHeight + keySpacing);
  const btns = [
    { label: "SHIFT", func: onShift, width: keyWidth * 1.5 },
    { label: "SPACE", func: onSpace, width: keyWidth * 4 },
    { label: "ENTER", func: onEnter, width: keyWidth * 2 },
    { label: "←", func: onBackspace, width: keyWidth * 1.5 },
  ];

  const totalW = btns.reduce((sum, b) => sum + b.width + keySpacing, 0);
  let offsetX = (ww - totalW + keySpacing) / 2;
  let x = offsetX;

  btns.forEach((btn) => {
    addSpecialButton(scene, x, y, btn.width, keyHeight, btn.label, btn.func);
    x += btn.width + keySpacing;
  });
}

function addKeyButton(scene, x, y, char) {
  let keyValue = shift ? char.toUpperCase() : char.toLowerCase();
  if (char === "ß" && shift) keyValue = "ẞ";
  if (char.match(/[0-9]/)) keyValue = char;

  const centerX = x + keyWidth / 2;
  const centerY = y + keyHeight / 2;

  const rect = scene.add.rectangle(
    centerX,
    centerY,
    keyWidth,
    keyHeight,
    0x000000
  );

  const keyId = `neon-${char}-${Math.random().toFixed(6)}`;
  const pipeline = new NeonPipeline(scene.game);
  pipeline.resolution[0] = keyWidth;
  pipeline.resolution[1] = keyHeight;
  pipeline.time = Math.random() * 10;

  scene.renderer.pipelines.add(keyId, pipeline);
  rect.setPipeline(keyId);
  scene.neonPipelines[keyId] = pipeline;

  const label = scene.add
    .text(centerX, centerY, keyValue, {
      font: `${Math.floor(keyHeight * 0.44)}px Arial`,
      color: "#39ff14",
    })
    .setOrigin(0.5);

  rect.setInteractive({ cursor: "pointer" });
  rect.on("pointerdown", () => onKeyPress(keyValue, scene));

  keyboardGroup.add(rect);
  keyboardGroup.add(label);
}

function addSpecialButton(scene, x, y, w, h, labelText, func) {
  const rect = scene.add.rectangle(x + w / 2, y + h / 2, w, h, 0x000000);

  const keyId = `neon-${labelText}-${Math.random().toFixed(6)}`;
  const pipeline = new NeonPipeline(scene.game);
  pipeline.resolution[0] = w;
  pipeline.resolution[1] = h;
  pipeline.time = Math.random() * 10;

  scene.renderer.pipelines.add(keyId, pipeline);
  rect.setPipeline(keyId);
  scene.neonPipelines[keyId] = pipeline;

  const sizeByHeight = Math.floor(h * 0.44);
  const sizeByWidth = Math.floor((w * 0.9) / labelText.length);
  const fontSize = Math.min(sizeByHeight, sizeByWidth);

  const label = scene.add
    .text(x + w / 2, y + h / 2, labelText, {
      font: `${fontSize}px Arial`,
      color: "#39ff14",
    })
    .setOrigin(0.5);

  rect.setInteractive({ cursor: "pointer" });
  rect.on("pointerdown", () => func(scene));

  keyboardGroup.add(rect);
  keyboardGroup.add(label);
}

function onKeyPress(char, scene) {
  inputString += char;
  updateInputDisplay();
}

function onBackspace(scene) {
  inputString = inputString.slice(0, -1);
  updateInputDisplay();
}

function onEnter(scene) {
  inputString += "\n";
  updateInputDisplay();
}

function onSpace(scene) {
  inputString += " ";
  updateInputDisplay();
}

function onShift(scene) {
  shift = !shift;
  drawKeyboard(scene);
}

function updateInputDisplay() {
  inputBoxText.setText(inputString);
  const txtWidth = inputBoxText.width;
  inputBoxText.setX(game.scale.width / 2);
  cursorText.setX(game.scale.width / 2 + txtWidth / 2 + 2);
  cursorText.setVisible(cursorVisible);
}

function update(time, delta) {
  if (time - lastBlink > 500) {
    cursorVisible = !cursorVisible;
    lastBlink = time;
    cursorText.setVisible(cursorVisible);
  }

  const pipelines = game.scene.scenes[0]?.neonPipelines;
  if (pipelines) {
    for (let id in pipelines) {
      pipelines[id].time += delta * 0.001;
    }
  }
}

Phaser.GameObjects.Group.prototype.toggleVisible = function (visible) {
  this.getChildren().forEach((child) => child.setVisible(visible));
};
