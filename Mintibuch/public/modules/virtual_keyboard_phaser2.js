var game = new Phaser.Game(
  window.innerWidth,
  window.innerHeight,
  Phaser.AUTO,
  "",
  { preload: preload, create: create }
);

var inputString = "";
var keyboardGroup;
var inputBox, inputBoxText, cursorText;
var shift = false;
var cursorVisible = true;
var blinkTimer = 0;

var keyWidth, keyHeight, keySpacing, inputBoxWidth, inputBoxHeight;

var keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "ß"],
];

function preload() {}

function create() {
  game.stage.backgroundColor = "#efefef";
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  createLayout();

  // Dışına tıklayınca klavyeyi kapat
  game.input.onDown.add(function (pointer) {
    var x = pointer.x,
      y = pointer.y;
    if (inputBox.getBounds().contains(x, y)) return;
    var found = false;
    keyboardGroup.forEach(function (child) {
      if (child.getBounds && child.getBounds().contains(x, y)) found = true;
    });
    if (found) return;
    keyboardGroup.visible = false;
  }, this);

  blinkTimer = game.time.now + 500;
}

function createLayout() {
  var ww = game.width;
  var wh = game.height;

  // Tuş boyutları dinamik
  var maxKeysInRow = Math.max.apply(
    null,
    keys.map(function (row) {
      return row.length;
    })
  );
  keySpacing = Math.max(6, Math.floor(ww * 0.005));
  keyWidth = Math.floor((ww - (maxKeysInRow + 1) * keySpacing) / maxKeysInRow);
  keyHeight = Math.max(Math.floor(wh * 0.08), 38);

  inputBoxWidth = Math.max(Math.floor(ww * 0.75), 220);
  inputBoxHeight = Math.max(Math.floor(wh * 0.09), 38);

  // Eski objeleri temizle
  if (inputBox) inputBox.destroy();
  if (inputBoxText) inputBoxText.destroy();
  if (cursorText) cursorText.destroy();
  if (keyboardGroup) keyboardGroup.destroy();

  // Input Box (üstte, ortada)
  inputBox = game.add.graphics(ww / 2 - inputBoxWidth / 2, keySpacing);
  inputBox.beginFill(0xffffff);
  inputBox.lineStyle(2, 0x222222, 1);
  inputBox.drawRect(0, 0, inputBoxWidth, inputBoxHeight);
  inputBox.endFill();
  inputBox.inputEnabled = true;
  inputBox.input.useHandCursor = true;
  inputBox.events.onInputDown.add(openKeyboard, this);

  inputBoxText = game.add.text(ww / 2, keySpacing + inputBoxHeight / 2, "", {
    font: Math.floor(keyHeight * 0.5) + "px Arial",
    fill: "#333",
  });
  inputBoxText.anchor.set(0.5);

  cursorText = game.add.text(ww / 2, keySpacing + inputBoxHeight / 2, "|", {
    font: Math.floor(keyHeight * 0.5) + "px Arial",
    fill: "#333",
  });
  cursorText.anchor.set(0.5);

  // Klavye grubu
  keyboardGroup = game.add.group();
  drawKeyboard();

  keyboardGroup.visible = false;

  updateInputDisplay();
}

function drawKeyboard() {
  keyboardGroup.removeAll(true);

  var ww = game.width;
  var wh = game.height;

  var startY = keySpacing * 2 + inputBoxHeight;

  for (var row = 0; row < keys.length; row++) {
    var rowKeys = keys[row];
    var rowWidth = rowKeys.length * (keyWidth + keySpacing);
    var offsetX = (ww - rowWidth) / 2;
    for (var col = 0; col < rowKeys.length; col++) {
      addKeyButton(
        offsetX + col * (keyWidth + keySpacing),
        startY + row * (keyHeight + keySpacing),
        rowKeys[col]
      );
    }
  }

  // Alt satır: Shift, Space, Enter, Backspace
  var y = startY + keys.length * (keyHeight + keySpacing);
  var btns = [
    { label: "SHIFT", func: onShift, width: keyWidth * 1.5 },
    { label: "SPACE", func: onSpace, width: keyWidth * 4 },
    { label: "ENTER", func: onEnter, width: keyWidth * 2 },
    { label: "←", func: onBackspace, width: keyWidth * 1.5 },
  ];
  var totalW = btns.reduce(function (sum, b) {
    return sum + b.width + keySpacing;
  }, 0);
  var offsetX = (ww - totalW + keySpacing) / 2;
  var x = offsetX;
  btns.forEach(function (btn) {
    addSpecialButton(x, y, btn.width, keyHeight, btn.label, btn.func);
    x += btn.width + keySpacing;
  });
}

function addKeyButton(x, y, char) {
  // Sadece ß için büyük harf: ẞ, rakamlara shift uygulamıyoruz
  var keyValue;
  if (char === "ß" && shift) {
    keyValue = "ẞ";
  } else if (char.match(/[0-9]/)) {
    keyValue = char;
  } else {
    keyValue = shift ? char.toUpperCase() : char.toLowerCase();
  }
  var key = game.add.button(x, y, null, onKeyPress, this);
  key.width = keyWidth;
  key.height = keyHeight;
  key.keyValue = keyValue;

  var g = game.add.graphics(x, y);
  g.beginFill(0xffffff);
  g.lineStyle(2, 0x333333, 1);
  g.drawRect(0, 0, keyWidth, keyHeight);
  g.endFill();

  var label = game.add.text(x + keyWidth / 2, y + keyHeight / 2, keyValue, {
    font: Math.floor(keyHeight * 0.44) + "px Arial",
    fill: "#333",
  });
  label.anchor.set(0.5);

  keyboardGroup.add(g);
  keyboardGroup.add(key);
  keyboardGroup.add(label);
}

function addSpecialButton(x, y, w, h, labelText, func) {
  var key = game.add.button(x, y, null, func, this);
  key.width = w;
  key.height = h;

  var g = game.add.graphics(x, y);
  g.beginFill(0xf4f4f4);
  g.lineStyle(2, 0x333333, 1);
  g.drawRect(0, 0, w, h);
  g.endFill();

  var sizeByHeight = Math.floor(h * 0.44);
  var sizeByWidth = Math.floor((w * 0.9) / labelText.length);
  var labelFontSize = Math.min(sizeByHeight, sizeByWidth);

  var label = game.add.text(x + w / 2, y + h / 2, labelText, {
    font: labelFontSize + "px Arial",
    fill: "#555",
  });
  label.anchor.set(0.5);

  keyboardGroup.add(g);
  keyboardGroup.add(key);
  keyboardGroup.add(label);
}

function onKeyPress(button) {
  inputString += button.keyValue;
  updateInputDisplay();
}

function onBackspace() {
  inputString = inputString.slice(0, -1);
  updateInputDisplay();
}

function onEnter() {
  inputString += "\n";
  updateInputDisplay();
}

function onSpace() {
  inputString += " ";
  updateInputDisplay();
}

function onShift() {
  shift = !shift;
  drawKeyboard();
}

function updateInputDisplay() {
  inputBoxText.setText(inputString);
  var txtWidth = inputBoxText.width;
  // Ortaya hizala (input kutusu ortası)
  var ww = game.width;
  inputBoxText.x = ww / 2;
  cursorText.x = ww / 2 + txtWidth / 2 + 2;
  cursorText.visible = cursorVisible;
  cursorText.setText("|");
}

// Klavyeyi aç
function openKeyboard() {
  keyboardGroup.visible = true;
}

// Pencere yeniden boyutlanınca sahneyi yeniden çiz
window.onresize = function () {
  game.width = window.innerWidth;
  game.height = window.innerHeight;
  game.renderer.resize(window.innerWidth, window.innerHeight);
  createLayout();
  updateInputDisplay();
};

// Cursor blink
game.time.events.loop(Phaser.Timer.SECOND / 2, function () {
  cursorVisible = !cursorVisible;
  updateInputDisplay();
});
