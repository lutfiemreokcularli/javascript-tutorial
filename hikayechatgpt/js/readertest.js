import { Scene, PhaserHelper } from "./Minti.js";
let x, y;
var _this;
var Seite1 = {
  Assets: {
    baseURL: "assets/",
    mp3Player: true,
    defaultItems: true,
    image: {
      book: "ui/book3.png",
      prev: "ui/prev.png",
      next: "ui/next.png",
      sico: "ui/sound.png",
    },
    audio: {},
    text: {
      content: "data/content.json",
    },
  },
  config: Minti.mintibuchConfig1,
};
var ASSETS = {
  book: { key: "book", url: "assets/ui/book3.png" },
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
Seite1.PlayScene = function () {
  this.init = function () {
    this.add.image(0, 0, "bg");
  };
  this.create = function () {
    _this = this;
    core.stage.backgroundColor = "#eae7dc";
    core.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    core.scale.pageAlignHorizontally = true;
    core.scale.pageAlignVertically = true;

    // 1) Önce DEFTER (arkada dursun)
    S.book = core.add.sprite(
      core.world.centerX,
      core.world.centerY,
      ASSETS.book.key
    );
    S.book.anchor.set(0.5);
    fitBookToScreen();

    // 2) Sonra GRUPLAR (cover/left/right/ui) — book’un üstünde olacaklar
    S.groups.left = core.add.group();
    S.groups.right = core.add.group();
    S.groups.cover = core.add.group();
    S.groups.ui = core.add.group();

    // 3) Prev / Next (defterin İÇ kenarları)
    S.buttons.prev = core.add.button(
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
    S.buttons.next = core.add.button(
      0,
      0,
      ASSETS.next.key,
      onNext,
      core,
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
    var cursors = core.input.keyboard.createCursorKeys();
    cursors.left.onDown.add(onPrev, this);
    cursors.right.onDown.add(onNext, this);

    // JSON oku
    try {
      S.data = JSON.parse(core.cache.getText("content"));
    } catch (e) {
      console.error("content.json parse hatası:", e);
      S.data = { cover: null, pages: [] };
    }

    // Dinamik asset kuyruğu
    queueDynamicAssets(S.data);

    // ----- Yükleme logları -----
    core.load.onFileError.add(function (key, file) {
      console.warn("LOAD ERROR:", key, file && file.url);
    });
    core.load.onFileComplete.add(function (
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

    core.load.onLoadComplete.addOnce(function () {
      renderCover();
      updateNavVisibility();
    });
    core.load.start();

    // Resize
    core.scale.onSizeChange.add(function () {
      fitBookToScreen();
      layoutNavButtons();
      renderCurrent();
    });
  };
};
function fitBookToScreen() {
  var maxW = core.world.width * 0.9;
  var maxH = core.world.height * 0.82;
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
  core.world.bringToTop(S.groups.cover);
  core.world.bringToTop(S.groups.left);
  core.world.bringToTop(S.groups.right);
  core.world.bringToTop(S.groups.ui);
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
    if (!core.cache.checkImageKey(key)) core.load.image(key, url);
  });
  snds.forEach(function (url) {
    var key = getSndKey(url);
    if (!core.cache.checkSoundKey(key)) core.load.audio(key, [url]);
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

  var spr = core.add.sprite(
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
  var bg = core.add.graphics(rect.x, rect.y, group);
  bg.beginFill(0x000000, 0.04);
  bg.drawRect(0, 0, rect.width, rect.height);
  bg.endFill();

  var pad = 20;

  if (item.type === "text") {
    var style = item.style || { font: "28px Arial", fill: "#111" };
    renderRichText(
      core,
      {
        x: rect.x + pad,
        y: rect.y + pad,
        maxWidth: 500,
        lineSpacing: 8,
        parent: group,
        baseStyle: {
          fontFamily: "Arial",
          fontSize: 22,
          fill: "#890a0aff",
          stroke: "#000000",
          strokeThickness: 0,
        },
      },
      item.content
    );
    /* var txt = core.add.text(
      rect.x + pad,
      rect.y + pad,
      item.content || "",
      style,
      group
    );
    txt.wordWrap = true;
    txt.wordWrapWidth = rect.width - pad * 2; */
  } else if (item.type === "image") {
    var imgKey = getImgKey(item.content);
    var spr = core.add.sprite(rect.centerX, rect.y + pad, imgKey, null, group);
    spr.anchor.set(0.5, 0);
    var maxW = rect.width - pad * 2,
      maxH = rect.height * 0.72; // üstte görsel alanı
    var s = Math.min(maxW / spr.width, maxH / spr.height);
    spr.scale.set(s);
  }

  // Sound her zaman altta
  var sndKey = item.sound ? getSndKey(item.sound) : null;
  var mp3Player = new Minti.PhaserHelper.MP3Player(_this, "default", sndKey, {
    autoPlay: false,
    volume: 1,
    width: 500,
    x: rect.x + 40,
    y: rect.y + rect.height - 46,
  });
  group.add(mp3Player);
  /* var btn = core.add.button(
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
  btn.scale.set(40 / Math.max(btn.width, btn.height)); */
}

function stopAll() {
  ["left", "right"].forEach(function (side) {
    if (S.sounds[side]) S.sounds[side].stop();
  });
}

function playSideSound(side, key) {
  debugger;
  if (!key) return;
  if (S.sounds[side]) S.sounds[side].stop();
  var s = core.add.audio(key);
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

function renderRichText(game, opts, html) {
  var x = opts.x || 0;
  var y = opts.y || 0;
  var maxWidth = opts.maxWidth || 600;
  var lineSpacing = typeof opts.lineSpacing === "number" ? opts.lineSpacing : 4;
  var parent = opts.parent || game.world;

  var base = opts.baseStyle || {};
  var baseFamily = base.fontFamily || "Arial";
  var baseSize = typeof base.fontSize === "number" ? base.fontSize : 20;
  var baseFill = base.fill || "#ffffff";
  var baseStroke = base.stroke || "#000000";
  var baseStrokeThickness =
    typeof base.strokeThickness === "number" ? base.strokeThickness : 0;

  html = sanitizeToWhitelist(html);

  var tokens = tokenizeHtml(html);

  var styleStack = [
    {
      bold: false,
      italic: false,
      underline: false,
      color: baseFill,
      size: baseSize,
      family: baseFamily,
    },
  ];

  var cursorX = x;
  var cursorY = y;
  var lineMaxSize = 0;

  tokens.forEach(function (tok) {
    if (tok.type === "tag") {
      handleTag(tok.value, styleStack, function doLineBreak() {
        cursorX = x;
        cursorY += (lineMaxSize || baseSize) + lineSpacing;
        lineMaxSize = 0;
      });
    } else if (tok.type === "text") {
      var active = styleStack[styleStack.length - 1];
      var words = tok.value.split(/(\s+)/); // keep spaces
      var buffer = "";

      for (var i = 0; i < words.length; i++) {
        var piece = words[i];
        var testStr = buffer + piece;

        var measureText = createText(game, -10000, -10000, testStr, active, {
          stroke: baseStroke,
          strokeThickness: baseStrokeThickness,
        });
        var testWidth = measureText.width;
        measureText.destroy();

        if (
          cursorX > x &&
          cursorX - x + testWidth > maxWidth &&
          buffer.trim() !== ""
        ) {
          var span = createText(game, cursorX, cursorY, buffer, active, {
            stroke: baseStroke,
            strokeThickness: baseStrokeThickness,
          });
          parent.add(span);
          if (active.underline) {
            drawUnderline(game, parent, span, active, baseFill);
          }
          cursorX += span.width;
          cursorX = x;
          cursorY += (lineMaxSize || active.size) + lineSpacing;
          lineMaxSize = 0;
          buffer = piece;
        } else {
          buffer = testStr;
        }

        if (i === words.length - 1 && buffer !== "") {
          var span2 = createText(game, cursorX, cursorY, buffer, active, {
            stroke: baseStroke,
            strokeThickness: baseStrokeThickness,
          });
          parent.add(span2);
          if (active.underline) {
            drawUnderline(game, parent, span2, active, baseFill);
          }
          cursorX += span2.width;
          lineMaxSize = Math.max(lineMaxSize, active.size);
          buffer = "";
        }
      }
    }
  });

  function createText(game, x, y, str, st, extra) {
    var style = {
      font: st.size + "px " + (st.family || baseFamily),
      fontWeight: st.bold ? "bold" : "normal",
      fontStyle: st.italic ? "italic" : "normal",
      fill: st.color || baseFill,
      stroke: (extra && extra.stroke) || baseStroke,
      strokeThickness: (extra && extra.strokeThickness) || baseStrokeThickness,
    };
    var t = game.add.text(x, y, str, style);
    t.updateText();
    return t;
  }

  function drawUnderline(game, parent, textObj, st, fallbackFill) {
    var g = game.add.graphics(0, 0);
    parent.add(g);
    // color int from hex string
    var hex = (st.color || fallbackFill || "#ffffff").replace("#", "");
    var r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
    var gC = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
    var b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
    var hexInt = Phaser.Color.getColor(r, gC, b);

    var thickness = Math.max(1, Math.round(st.size * 0.08));
    var underlineY = textObj.y + textObj.height - Math.round(st.size * 0.15);

    g.lineStyle(thickness, hexInt, 1);
    g.moveTo(textObj.x, underlineY);
    g.lineTo(textObj.x + textObj.width, underlineY);
  }

  function sanitizeToWhitelist(raw) {
    raw = raw.replace(
      /<(\/?)(script|style|img|video|audio|iframe)[^>]*>/gi,
      ""
    );
    return raw
      .replace(/<\s*br\s*\/?>/gi, "<br>")
      .replace(/<\s*b\s*>/gi, "<b>")
      .replace(/<\s*\/\s*b\s*>/gi, "</b>")
      .replace(/<\s*i\s*>/gi, "<i>")
      .replace(/<\s*\/\s*i\s*>/gi, "</i>")
      .replace(/<\s*u\s*>/gi, "<u>")
      .replace(/<\s*\/\s*u\s*>/gi, "</u>")
      .replace(
        /<\s*color\s*=\s*["']?#([0-9a-fA-F]{3,6})["']?\s*>/gi,
        function (_, hex) {
          return "<color=#" + hex.toLowerCase() + ">";
        }
      )
      .replace(/<\s*\/\s*color\s*>/gi, "</color>")
      .replace(/<\s*size\s*=\s*["']?(\d{1,3})["']?\s*>/gi, function (_, sz) {
        return "<size=" + sz + ">";
      })
      .replace(/<\s*\/\s*size\s*>/gi, "</size>")
      .replace(/<(?!\/?(?:b|i|u|br|color|size)(?:[>\s=]|>)).*?>/gi, "");
  }

  function tokenizeHtml(s) {
    var parts = s.split(/(<\/?[^>]+>)/g).filter(function (p) {
      return p.length > 0;
    });
    return parts.map(function (p) {
      if (p.charAt(0) === "<" && p.charAt(p.length - 1) === ">") {
        return { type: "tag", value: p };
      }
      return { type: "text", value: p };
    });
  }

  function handleTag(tag, stack, onBr) {
    tag = tag.trim();

    if (/^<br\s*\/?>$/i.test(tag)) {
      onBr && onBr();
      return;
    }

    if (/^<b>$/i.test(tag)) {
      var top = cloneTop(stack);
      top.bold = true;
      stack.push(top);
      return;
    }
    if (/^<\/b>$/i.test(tag)) {
      popUntil(
        stack,
        function (s) {
          return s.bold;
        },
        function (s) {
          s.bold = false;
        }
      );
      return;
    }

    if (/^<i>$/i.test(tag)) {
      var topi = cloneTop(stack);
      topi.italic = true;
      stack.push(topi);
      return;
    }
    if (/^<\/i>$/i.test(tag)) {
      popUntil(
        stack,
        function (s) {
          return s.italic;
        },
        function (s) {
          s.italic = false;
        }
      );
      return;
    }

    if (/^<u>$/i.test(tag)) {
      var topu = cloneTop(stack);
      topu.underline = true;
      stack.push(topu);
      return;
    }
    if (/^<\/u>$/i.test(tag)) {
      popUntil(
        stack,
        function (s) {
          return s.underline;
        },
        function (s) {
          s.underline = false;
        }
      );
      return;
    }

    var mColor = tag.match(/^<color=#([0-9a-fA-F]{3,6})>$/i);
    if (mColor) {
      var topc = cloneTop(stack);
      topc.color = "#" + mColor[1].toLowerCase();
      stack.push(topc);
      return;
    }
    if (/^<\/color>$/i.test(tag)) {
      popUntil(
        stack,
        function (s, prev) {
          return s.color !== prev.color;
        },
        function (s, prev) {
          s.color = prev.color;
        }
      );
      return;
    }

    var mSize = tag.match(/^<size=(\d{1,3})>$/i);
    if (mSize) {
      var tops = cloneTop(stack);
      var val = Math.max(8, Math.min(200, parseInt(mSize[1], 10)));
      tops.size = val;
      stack.push(tops);
      return;
    }
    if (/^<\/size>$/i.test(tag)) {
      popUntil(
        stack,
        function (s, prev) {
          return s.size !== prev.size;
        },
        function (s, prev) {
          s.size = prev.size;
        }
      );
      return;
    }
  }

  function cloneTop(stack) {
    var t = stack[stack.length - 1];
    return {
      bold: t.bold,
      italic: t.italic,
      underline: t.underline,
      color: t.color,
      size: t.size,
      family: t.family,
    };
  }

  function popUntil(stack, predicate, resetter) {
    if (stack.length <= 1) return;
    var top = stack.pop();
    var newTop = stack[stack.length - 1];
    if (predicate(top, newTop)) {
      resetter(newTop, top);
    }
  }
}

let core;
core = new Phaser.Game(Seite1.config);
core.state.add("Boot", new PhaserHelper.BootState("Preload"), true);
core.state.add(
  "Preload",
  new PhaserHelper.PreloadState("PlayScene", Seite1.Assets, core)
);
core.state.add("PlayScene", Seite1.PlayScene);
