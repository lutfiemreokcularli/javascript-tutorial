const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#efefef",
  scale: {
    mode: Phaser.Scale.RESIZE, // her ekrana uy
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    resize: resize,
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

// TUŞ DİZİLİMİ (Rakamlar + Alman QWERTZ)
const keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "ß"],
];

// Dinamik tuş boyutları (her cihaz için hesaplanacak)
let keyWidth, keyHeight, keySpacing, inputBoxWidth, inputBoxHeight;

function preload() {}

function create() {
  createLayout(this);

  // Dışına tıklayınca klavyeyi kapat
  this.input.on("pointerdown", function (pointer) {
    let x = pointer.x,
      y = pointer.y;
    if (Phaser.Geom.Rectangle.Contains(inputBox.getBounds(), x, y)) return;
    let found = false;
    keyboardGroup.getChildren().forEach((child) => {
      if (
        child.getBounds &&
        Phaser.Geom.Rectangle.Contains(child.getBounds(), x, y)
      )
        found = true;
    });
    if (found) return;
    keyboardGroup.toggleVisible(false);
  });

  updateInputDisplay();
}

function resize(width, height) {
  // Yeniden çiz
  if (game.scene.scenes[0]) {
    createLayout(game.scene.scenes[0]);
    updateInputDisplay();
  }
}

function createLayout(scene) {
  let ww = scene.scale.width;
  let wh = scene.scale.height;

  // Tuş boyutlarını dinamik hesapla (kenarlarda min 12px boşluk)
  let maxKeysInRow = Math.max(...keys.map((row) => row.length));
  keySpacing = Math.max(6, Math.floor(ww * 0.005));
  keyWidth = Math.floor((ww - (maxKeysInRow + 1) * keySpacing) / maxKeysInRow);
  keyHeight = Math.max(Math.floor(wh * 0.08), 38);

  inputBoxWidth = Math.max(Math.floor(ww * 0.75), 220);
  inputBoxHeight = Math.max(Math.floor(wh * 0.09), 38);

  // Var olan objeler silinsin (yeniden çizmek için)
  if (inputBox) inputBox.destroy();
  if (inputBoxText) inputBoxText.destroy();
  if (cursorText) cursorText.destroy();
  if (keyboardGroup) keyboardGroup.clear(true, true);

  // Input Box (üstte, ortada)
  inputBox = scene.add
    .rectangle(
      ww / 2,
      keySpacing + inputBoxHeight / 2,
      inputBoxWidth,
      inputBoxHeight,
      0xffffff
    )
    .setStrokeStyle(2, 0x222222)
    .setOrigin(0.5, 0.5)
    .setInteractive({ cursor: "pointer" });
  inputBoxText = scene.add
    .text(ww / 2, keySpacing + inputBoxHeight / 2, "", {
      font: `${Math.floor(keyHeight * 0.5)}px Arial`,
      color: "#333",
    })
    .setOrigin(0.5);
  cursorText = scene.add
    .text(ww / 2, keySpacing + inputBoxHeight / 2, "|", {
      font: `${Math.floor(keyHeight * 0.5)}px Arial`,
      color: "#333",
    })
    .setOrigin(0.5);

  inputBox.on("pointerdown", openKeyboard, scene);

  // Klavye grubu
  keyboardGroup = scene.add.group();
  drawKeyboard(scene);

  keyboardGroup.toggleVisible(false);
}
function openKeyboard() {
  keyboardGroup.toggleVisible(true);
}
function drawKeyboard(scene) {
  keyboardGroup.clear(true, true);

  let ww = scene.scale.width;
  let wh = scene.scale.height;

  // Klavye başlangıç Y
  const startY = keySpacing * 2 + inputBoxHeight;

  // Tuşlar
  for (let row = 0; row < keys.length; row++) {
    const rowKeys = keys[row];
    const rowWidth = rowKeys.length * (keyWidth + keySpacing);
    const offsetX = (ww - rowWidth) / 2;
    for (let col = 0; col < rowKeys.length; col++) {
      addKeyButton(
        scene,
        offsetX + col * (keyWidth + keySpacing),
        startY + row * (keyHeight + keySpacing),
        rowKeys[col]
      );
    }
  }

  // Alt satır: Shift, Space, Enter, Backspace
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
  // Sadece ß için büyük harf: ẞ, rakamlara shift uygulamıyoruz
  let keyValue;
  if (char === "ß" && shift) {
    keyValue = "ẞ";
  } else if (char.match(/[0-9]/)) {
    keyValue = char;
  } else {
    keyValue = shift ? char.toUpperCase() : char.toLowerCase();
  }
  let rect = scene.add
    .rectangle(
      x + keyWidth / 2,
      y + keyHeight / 2,
      keyWidth,
      keyHeight,
      0xffffff
    )
    .setStrokeStyle(2, 0x333333)
    .setInteractive({ cursor: "pointer" });
  let label = scene.add
    .text(x + keyWidth / 2, y + keyHeight / 2, keyValue, {
      font: `${Math.floor(keyHeight * 0.44)}px Arial`,
      color: "#333",
    })
    .setOrigin(0.5);

  rect.on("pointerdown", function () {
    onKeyPress(keyValue, scene);
  });

  keyboardGroup.add(rect);
  keyboardGroup.add(label);
}

function addSpecialButton(scene, x, y, w, h, labelText, func) {
  let rect = scene.add
    .rectangle(x + w / 2, y + h / 2, w, h, 0xf4f4f4)
    .setStrokeStyle(2, 0x333333)
    .setInteractive({ cursor: "pointer" });

  // En fazla tuşun yüksekliğinin %44'ü
  let sizeByHeight = Math.floor(h * 0.44);
  // En fazla tuşun genişliğinin %90'ı / karakter sayısı (her karakter max %90'ı kaplayabilir)
  let sizeByWidth = Math.floor((w * 0.9) / labelText.length);

  // İkisi arasından küçük olanı seç
  let labelFontSize = Math.min(sizeByHeight, sizeByWidth);

  let label = scene.add
    .text(x + w / 2, y + h / 2, labelText, {
      font: `${labelFontSize}px Arial`,
      color: "#555",
    })
    .setOrigin(0.5);

  rect.on("pointerdown", function () {
    func(scene);
  });

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

  // Metin genişliği
  let txtWidth = inputBoxText.width;

  // Ortaya hizalama (input kutusu ortası)
  inputBoxText.setX(game.scale.width / 2);
  cursorText.setX(game.scale.width / 2 + txtWidth / 2 + 2);

  cursorText.setText("|");
  cursorText.setVisible(cursorVisible);
}

function update(time, delta) {
  if (time - lastBlink > 500) {
    cursorVisible = !cursorVisible;
    lastBlink = time;
    cursorText.setVisible(cursorVisible);
  }
}

// Group'a toggleVisible fonksiyonu ekle (Phaser 3 için kolaylık)
Phaser.GameObjects.Group.prototype.toggleVisible = function (visible) {
  this.getChildren().forEach((child) => child.setVisible(visible));
};
