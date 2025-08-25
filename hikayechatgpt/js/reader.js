import { Scene, PhaserHelper } from "./Minti.js";
let x, y;
var _this;
var Seite1 = {
  Assets: {
    baseURL: "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/",
    mp3Player: true,
    defaultItems: true,
    image: {
      book: "andreas-hat-geburtstag/book3.png",
      prev: "andreas-hat-geburtstag/prev.png",
      next: "andreas-hat-geburtstag/next.png",
      sico: "andreas-hat-geburtstag/sound.png",
    },
    audio: {},
    text: {
      content:
        "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/andreas-hat-geburtstag/content.json",
    },
  },
  config: Minti.mintibuchConfig1,
};
var ASSETS = {
  book: {
    key: "book",
    url: "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/andreas-hat-geburtstag/book3.png",
  },
  prev: {
    key: "prev",
    url: "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/andreas-hat-geburtstag/prev.png",
  },
  next: {
    key: "next",
    url: "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/andreas-hat-geburtstag/next.png",
  },
  sico: {
    key: "sico",
    url: "https://cdn.minticity.com/assets/mediathek/kurzgeschichten/andreas-hat-geburtstag/sound.png",
  },
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
        x: rect.x + pad + 100,
        y: rect.y + pad + 100,
        maxWidth: 600,
        lineSpacing: 8,
        parent: group,
        baseStyle: {
          fontFamily: "Arial",
          fontSize: 22,
          fill: "#120f0fff",
          stroke: "#000000",
          strokeThickness: 0,
        },
      },
      item.content
    );
    var sndKey = item.sound ? getSndKey(item.sound) : null;
    var mp3Player = new PhaserHelper.MP3Player(_this, "default", sndKey, {
      autoPlay: false,
      volume: 1,
      width: 500,
      x: rect.x + 80,
      y: rect.y + rect.height - 46,
    });
    group.add(mp3Player);
    /* var txt = core.add.text(
      rect.x + pad,
      rect.y + pad,
      item.content || "",
      style,
      group
    );
    txt.wordWrap = true;
    txt.wordWrapWidth = rect.width - pad * 2; */
    // Sound her zaman altta
  } else if (item.type === "image") {
    var imgKey = getImgKey(item.content);
    var spr = core.add.sprite(
      rect.centerX,
      rect.y + pad + 50,
      imgKey,
      null,
      group
    );
    spr.anchor.set(0.5, 0);
    var maxW = rect.width - pad * 2,
      maxH = rect.height * 0.72; // üstte görsel alanı
    var s = Math.min(maxW / spr.width, maxH / spr.height);
    spr.scale.set(s);
  }

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

  // 1) Temizle + normalize et (whitelist & dönüştürmeler)
  html = sanitizeToWhitelist(html);

  // 2) Tokenize
  var tokens = tokenizeHtml(html);

  // 3) Stil stack
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

  // 4) Yerleşim state
  var cursorX = x;
  var cursorY = y;
  var lineMaxSize = 0; // o satırdaki en büyük font

  tokens.forEach(function (tok) {
    if (tok.type === "tag") {
      handleTag(tok.value, styleStack, doLineBreak, doParagraphBreak);
    } else if (tok.type === "text") {
      var active = styleStack[styleStack.length - 1];
      var raw = decodeEntities(tok.value);

      // HTML whitespace collapse (+ nbsp->space)
      raw = raw.replace(/\s+/g, " ");

      // Satır başındaki boşlukları at (görsel taşmayı engeller)
      if (cursorX === x) raw = raw.replace(/^\s+/, "");

      if (!raw) return;

      // boşlukları koruyarak bölelim
      var parts = raw.split(/(\s+)/); // spaces kept
      var buffer = "";

      for (var i = 0; i < parts.length; i++) {
        var piece = parts[i];
        var testStr = buffer + piece;

        // Ölçüm (görünmez text)
        var measureText = createText(game, -10000, -10000, testStr, active, {
          stroke: baseStroke,
          strokeThickness: baseStrokeThickness,
        });
        var testWidth = measureText.width;
        measureText.destroy();

        //var willOverflow = cursorX > x && cursorX - x + testWidth > maxWidth;
        var willOverflow = cursorX - x + testWidth > maxWidth;
        if (willOverflow && buffer.trim() !== "") {
          // 1) Önce buffer'ı bas
          var span = createText(game, cursorX, cursorY, buffer, active, {
            stroke: baseStroke,
            strokeThickness: baseStrokeThickness,
          });
          parent.add(span);
          if (active.underline)
            drawUnderline(game, parent, span, active, baseFill);

          cursorX += span.width;
          lineMaxSize = Math.max(lineMaxSize || 0, active.size);

          // 2) Yeni satıra geç
          doLineBreak();

          // 3) Yeni satır başında leading space kırp
          piece = piece.replace(/^\s+/, "");
          buffer = piece;
        } else if (willOverflow && buffer.trim() === "") {
          // Tek parça maxWidth'ten uzun: karakter karakter kır
          var head = "";
          var tail = piece;
          while (tail.length > 0) {
            var next = head + tail.charAt(0);
            var m = createText(game, -10000, -10000, next, active, {
              stroke: baseStroke,
              strokeThickness: baseStrokeThickness,
            });
            var w = m.width;
            m.destroy();
            if (cursorX - x + w > maxWidth) {
              // head’i bas, satır kır
              if (head) {
                var spanH = createText(game, cursorX, cursorY, head, active, {
                  stroke: baseStroke,
                  strokeThickness: baseStrokeThickness,
                });
                parent.add(spanH);
                if (active.underline)
                  drawUnderline(game, parent, spanH, active, baseFill);
                cursorX += spanH.width;
                lineMaxSize = Math.max(lineMaxSize || 0, active.size);
              }
              doLineBreak();
              head = "";
              continue; // aynı tail ile yeni satıra ölçmeye devam
            }
            head = next;
            tail = tail.slice(1);
          }
          buffer = head; // döngü bitti, kalan head yeni buffer
        } else {
          buffer = testStr;
        }

        // Döngü sonu: kalan buffer'ı yaz
        if (i === parts.length - 1 && buffer !== "") {
          var span2 = createText(game, cursorX, cursorY, buffer, active, {
            stroke: baseStroke,
            strokeThickness: baseStrokeThickness,
          });
          parent.add(span2);
          if (active.underline)
            drawUnderline(game, parent, span2, active, baseFill);

          cursorX += span2.width;
          lineMaxSize = Math.max(lineMaxSize || 0, active.size);
          buffer = "";
        }
      }
    }
  });

  // ==== helpers ====

  function doLineBreak() {
    cursorX = x;
    cursorY += (lineMaxSize || baseSize) + lineSpacing;
    lineMaxSize = 0;
  }

  function doParagraphBreak() {
    // paragraf: satırı bitir + bir ekstra satır boşluk
    cursorX = x;
    cursorY += (lineMaxSize || baseSize) * 0.05 + lineSpacing;
    // ekstra boş satır (paragraf aralığı)
    cursorY += baseSize + lineSpacing;
    lineMaxSize = 0;
  }

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
    // güvenli güncelleme
    if (typeof t.updateText === "function") t.updateText();
    return t;
  }

  function drawUnderline(game, parent, textObj, st, fallbackFill) {
    var g = game.add.graphics(0, 0);
    parent.add(g);
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

  // ——— HTML sanitize & normalize ———
  function sanitizeToWhitelist(raw) {
    if (!raw) return "";
    // tehlikeli tagleri at
    raw = raw.replace(
      /<(\/?)(script|style|img|video|audio|iframe|object|embed)[^>]*>/gi,
      ""
    );

    // normalize <br>
    raw = raw.replace(/<\s*br\s*\/?>/gi, "<br>");

    // strong/em → b/i
    raw = raw
      .replace(/<\s*strong\s*>/gi, "<b>")
      .replace(/<\s*\/\s*strong\s*>/gi, "</b>")
      .replace(/<\s*em\s*>/gi, "<i>")
      .replace(/<\s*\/\s*em\s*>/gi, "</i>");

    // span style="color:#abc" → <color=#abc>
    raw = raw
      .replace(
        /<\s*span[^>]*style\s*=\s*["'][^"']*color\s*:\s*(#[0-9a-fA-F]{3,6})[^"']*["'][^>]*>/gi,
        function (_, hex) {
          return "<color=" + hex.toLowerCase() + ">";
        }
      )
      .replace(/<\s*\/\s*span\s*>/gi, "</color>");

    // <span color="#abc"> → <color=#abc>
    raw = raw
      .replace(
        /<\s*span[^>]*\scolor\s*=\s*["']?(#[0-9a-fA-F]{3,6})["']?[^>]*>/gi,
        function (_, hex) {
          return "<color=" + hex.toLowerCase() + ">";
        }
      )
      .replace(/<\s*\/\s*span\s*>/gi, "</color>");

    // color/size kısa tagleri normalize et
    raw = raw
      .replace(
        /<\s*color\s*=\s*["']?#?([0-9a-fA-F]{3,6})["']?\s*>/gi,
        function (_, hex) {
          return "<color=#" + hex.toLowerCase() + ">";
        }
      )
      .replace(/<\s*\/\s*color\s*>/gi, "</color>")
      .replace(/<\s*size\s*=\s*["']?(\d{1,3})["']?\s*>/gi, function (_, sz) {
        return "<size=" + sz + ">";
      })
      .replace(/<\s*\/\s*size\s*>/gi, "</size>");

    // p taglerini bırak (whitelist’e ekle)
    // diğer tüm tagleri (b,i,u,br,color,size,p dışında) at
    raw = raw.replace(
      /<(?!\/?(?:b|i|u|br|color|size|p)(?:[>\s=]|>)).*?>/gi,
      ""
    );
    return raw;
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

  // ——— Tag handler ———
  function handleTag(tag, stack, onBr, onP) {
    tag = tag.trim();

    // BR
    if (/^<br\s*\/?>$/i.test(tag)) {
      onBr && onBr();
      return;
    }

    // P (paragraf) — açılışta satır başına gel; kapanışta ekstra boşluk
    if (/^<p\s*>$/i.test(tag)) {
      // paragraf başında eğer satır ortasındaysak bir satır sonu ver
      if (cursorX !== x) onBr && onBr();
      return;
    }
    if (/^<\/p\s*>$/i.test(tag)) {
      onP && onP();
      return;
    }

    // BOLD
    if (/^<b>$/i.test(tag)) {
      var topB = cloneTop(stack);
      topB.bold = true;
      stack.push(topB);
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

    // ITALIC
    if (/^<i>$/i.test(tag)) {
      var topI = cloneTop(stack);
      topI.italic = true;
      stack.push(topI);
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

    // UNDERLINE
    if (/^<u>$/i.test(tag)) {
      var topU = cloneTop(stack);
      topU.underline = true;
      stack.push(topU);
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

    // COLOR
    var mColor = tag.match(/^<color=#[0-9a-fA-F]{3,6}>$/i);
    if (mColor) {
      var hex = (tag.match(/#[0-9a-fA-F]{3,6}/) || ["#000"])[0];
      var topC = cloneTop(stack);
      topC.color = hex.toLowerCase();
      stack.push(topC);
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

    // SIZE
    var mSize = tag.match(/^<size=(\d{1,3})>$/i);
    if (mSize) {
      var topS = cloneTop(stack);
      var val = Math.max(8, Math.min(200, parseInt(mSize[1], 10)));
      topS.size = val;
      stack.push(topS);
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

  // ——— Utils ———
  function decodeEntities(s) {
    if (!s) return "";
    // hızlı dönüşümler
    s = s.replace(/&nbsp;/g, " ");
    // browser decoder
    var ta = document.createElement("textarea");
    ta.innerHTML = s;
    var out = ta.value || "";
    return out.replace(/\u00a0/g, " ");
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
