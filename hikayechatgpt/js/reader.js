/* Phaser 2.18 CE - JSON tabanlı defter okuyucu (lokal assetler) - render.js */
import { Scene, PhaserHelper } from "./Minti.js";
var game = new Phaser.Game(1813, 884, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
});

var ASSETS = {
  book: { key: "book", url: "assets/ui/book.png" },
  prev: { key: "prev", url: "assets/ui/prev.png" },
  next: { key: "next", url: "assets/ui/next.png" },
  sico: { key: "sico", url: "assets/ui/sound.png" },
};

var S = {
  data: null,
  spreadIndex: 0,
  coverVisible: true,
  book: null,
  groups: { left: null, right: null, ui: null, cover: null },
  buttons: { prev: null, next: null },
  sounds: { left: null, right: null },
};

function preload() {
  // UI
  game.load.image(ASSETS.book.key, ASSETS.book.url);
  game.load.image(ASSETS.prev.key, ASSETS.prev.url);
  game.load.image(ASSETS.next.key, ASSETS.next.url);
  game.load.image(ASSETS.sico.key, ASSETS.sico.url);
  // JSON
  game.load.text("content", "assets/data/content.json");
}

function create() {
  game.stage.backgroundColor = "#eae7dc";
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  // 1) Önce DEFTER (arkada dursun)
  S.book = game.add.sprite(
    game.world.centerX,
    game.world.centerY,
    ASSETS.book.key
  );
  S.book.anchor.set(0.5);
  fitBookToScreen();

  // 2) Sonra GRUPLAR (cover/left/right/ui) — book’un üstünde olacaklar
  S.groups.left = game.add.group();
  S.groups.right = game.add.group();
  S.groups.cover = game.add.group();
  S.groups.ui = game.add.group();

  // 3) Prev / Next (defterin İÇ kenarları)
  S.buttons.prev = game.add.button(
    0,
    0,
    ASSETS.prev.key,
    onPrev,
    this,
    0,
    0,
    0,
    0,
    S.groups.ui
  );
  S.buttons.prev.anchor.set(0, 0.5);
  S.buttons.next = game.add.button(
    0,
    0,
    ASSETS.next.key,
    onNext,
    this,
    0,
    0,
    0,
    0,
    S.groups.ui
  );
  S.buttons.next.anchor.set(1, 0.5);

  layoutNavButtons();

  // UI en öne
  bringUIToTop();

  // Klavye kısayol (← / →)
  var cursors = game.input.keyboard.createCursorKeys();
  cursors.left.onDown.add(onPrev, this);
  cursors.right.onDown.add(onNext, this);

  // JSON oku
  try {
    S.data = JSON.parse(game.cache.getText("content"));
  } catch (e) {
    console.error("content.json parse hatası:", e);
    S.data = { cover: null, pages: [] };
  }

  // Dinamik asset kuyruğu
  queueDynamicAssets(S.data);

  // ----- Yükleme logları -----
  game.load.onFileError.add(function (key, file) {
    console.warn("LOAD ERROR:", key, file && file.url);
  });
  game.load.onFileComplete.add(function (
    progress,
    cacheKey,
    success,
    totalLoaded,
    totalFiles
  ) {
    console.log(
      "LOAD %" + progress,
      " ->",
      cacheKey,
      "success:",
      success,
      "(" + totalLoaded + "/" + totalFiles + ")"
    );
  });

  game.load.onLoadComplete.addOnce(function () {
    renderCover();
    updateNavVisibility();
  });
  game.load.start();

  // Resize
  game.scale.onSizeChange.add(function () {
    fitBookToScreen();
    layoutNavButtons();
    renderCurrent();
  });
}

/* ----------------- Helpers ----------------- */
function fitBookToScreen() {
  var maxW = game.world.width * 0.9;
  var maxH = game.world.height * 0.82;
  var s = Math.min(maxW / S.book.texture.width, maxH / S.book.texture.height);
  S.book.scale.set(s);
}

function layoutNavButtons() {
  // Sprite.width/height zaten ölçekli değerler
  var bookW = S.book.width;
  var leftEdge = S.book.x - bookW / 2;
  var rightEdge = S.book.x + bookW / 2;
  var midY = S.book.y;
  var inset = 20;

  if (S.buttons.prev) {
    S.buttons.prev.x = leftEdge + inset;
    S.buttons.prev.y = midY;
  }
  if (S.buttons.next) {
    S.buttons.next.x = rightEdge - inset;
    S.buttons.next.y = midY;
  }
  bringUIToTop();
}

function bringUIToTop() {
  game.world.bringToTop(S.groups.cover);
  game.world.bringToTop(S.groups.left);
  game.world.bringToTop(S.groups.right);
  game.world.bringToTop(S.groups.ui);
}

function pageRects() {
  var bookW = S.book.width;
  var bookH = S.book.height;
  var bookX = S.book.x - bookW / 2;
  var bookY = S.book.y - bookH / 2;
  var half = bookW / 2,
    pad = 24;
  return {
    left: new Phaser.Rectangle(
      bookX + pad,
      bookY + pad,
      half - pad * 2,
      bookH - pad * 2
    ),
    right: new Phaser.Rectangle(
      bookX + half + pad,
      bookY + pad,
      half - pad * 2,
      bookH - pad * 2
    ),
  };
}

function clearSideGroups() {
  S.groups.left.removeAll(true);
  S.groups.right.removeAll(true);
}

function getImgKey(url) {
  return "img:" + fileKey(url);
}
function getSndKey(url) {
  return "snd:" + fileKey(url);
}
function fileKey(url) {
  var b = url.split("?")[0].split("#")[0];
  return b.substring(b.lastIndexOf("/") + 1);
}

function queueDynamicAssets(data) {
  if (!data) return;
  var imgs = [],
    snds = [];
  if (data.cover) imgs.push(data.cover);
  (data.pages || []).forEach(function (p) {
    if (p.page1 && p.page1.type === "image" && p.page1.content)
      imgs.push(p.page1.content);
    if (p.page2 && p.page2.type === "image" && p.page2.content)
      imgs.push(p.page2.content);
    if (p.page1 && p.page1.sound) snds.push(p.page1.sound);
    if (p.page2 && p.page2.sound) snds.push(p.page2.sound);
  });
  imgs = imgs.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
  snds = snds.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });

  imgs.forEach(function (url) {
    var key = getImgKey(url);
    if (!game.cache.checkImageKey(key)) game.load.image(key, url);
  });
  snds.forEach(function (url) {
    var key = getSndKey(url);
    if (!game.cache.checkSoundKey(key)) game.load.audio(key, [url]);
  });
}

function renderCover() {
  S.groups.cover.removeAll(true);
  clearSideGroups();

  if (!S.data || !S.data.cover) {
    S.coverVisible = false;
    S.spreadIndex = 0;
    renderSpread();
    return;
  }
  S.coverVisible = true;

  var rects = pageRects();
  var key = getImgKey(S.data.cover);
  var centerRect = new Phaser.Rectangle(
    rects.left.x,
    rects.left.y,
    rects.left.width + rects.right.width,
    rects.left.height
  );

  var spr = game.add.sprite(
    centerRect.centerX,
    centerRect.y + 8,
    key,
    null,
    S.groups.cover
  );
  spr.anchor.set(0.5, 0);
  var maxW = centerRect.width - 24,
    maxH = centerRect.height - 24;
  var s = Math.min(maxW / spr.width, maxH / spr.height);
  spr.scale.set(s);

  updateNavVisibility();
  bringUIToTop();
}

function renderCurrent() {
  if (S.coverVisible) renderCover();
  else renderSpread();
}

function renderSpread() {
  S.groups.cover.removeAll(true);
  clearSideGroups();

  var spread = (S.data.pages || [])[S.spreadIndex];
  if (!spread) {
    updateNavVisibility();
    return;
  }

  var rects = pageRects();
  renderSide("left", spread.page1, rects.left);
  renderSide("right", spread.page2, rects.right);

  updateNavVisibility();
  bringUIToTop();
}

function renderSide(side, item, rect) {
  if (!item) return;
  var group = S.groups[side];

  // sayfa arkaplanı
  var bg = game.add.graphics(rect.x, rect.y, group);
  bg.beginFill(0x000000, 0.04);
  bg.drawRect(0, 0, rect.width, rect.height);
  bg.endFill();

  var pad = 10;

  if (item.type === "text") {
    var style = item.style || { font: "28px Arial", fill: "#111" };
    var txt = game.add.text(
      rect.x + pad,
      rect.y + pad,
      item.content || "",
      style,
      group
    );
    txt.wordWrap = true;
    txt.wordWrapWidth = rect.width - pad * 2;
  } else if (item.type === "image") {
    var imgKey = getImgKey(item.content);
    var spr = game.add.sprite(rect.centerX, rect.y + pad, imgKey, null, group);
    spr.anchor.set(0.5, 0);
    var maxW = rect.width - pad * 2,
      maxH = rect.height * 0.72; // üstte görsel alanı
    var s = Math.min(maxW / spr.width, maxH / spr.height);
    spr.scale.set(s);
  }

  // Sound her zaman altta
  var sndKey = item.sound ? getSndKey(item.sound) : null;

  var btn = game.add.button(
    rect.x + rect.width / 2,
    rect.y + rect.height - 46,
    ASSETS.sico.key,
    function () {
      playSideSound(side, sndKey);
    },
    this,
    0,
    0,
    0,
    0,
    group
  );
  btn.anchor.set(0.5);
  btn.scale.set(40 / Math.max(btn.width, btn.height));
}

function stopAll() {
  ["left", "right"].forEach(function (side) {
    if (S.sounds[side]) S.sounds[side].stop();
  });
}

function playSideSound(side, key) {
  if (!key) return;
  if (S.sounds[side]) S.sounds[side].stop();
  var s = game.add.audio(key);
  S.sounds[side] = s;
  s.play();
}

function onPrev() {
  if (S.coverVisible) return; // cover’dan geri yok
  stopAll();
  if (S.spreadIndex > 0) {
    S.spreadIndex--;
    renderSpread();
  } else {
    S.coverVisible = true;
    renderCover();
  }
}

function onNext() {
  if (S.coverVisible) {
    S.coverVisible = false;
    S.spreadIndex = 0;
    renderSpread();
    return;
  }
  stopAll();
  if (S.spreadIndex < (S.data.pages || []).length - 1) {
    S.spreadIndex++;
    renderSpread();
  }
}

function updateNavVisibility() {
  S.buttons.prev.visible = !S.coverVisible; // cover'da gizle
  var last = (S.data.pages || []).length - 1;
  S.buttons.next.visible = S.coverVisible || S.spreadIndex < last;
  bringUIToTop();
}
