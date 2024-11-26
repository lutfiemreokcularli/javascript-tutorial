var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
      return typeof obj;
    }
    : function (obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };

function _extends(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var minti_titles = "";
var uyarilar = {
  memory: "Super!\nDein Memory ist bereit.\nSpiel und gewinne Mintos!",
  ende: "Die Übung ist zu Ende.\nBitte klick auf Speichern."
};
var minti_phaser = {
  baslik: { font: 'bold 40pt Amaranth "Roboto Condensed"', fill: "#576273" },
  baslik_1: { font: 'italic bold 30px "Roboto Condensed"', fill: "#576273" }
};

var PhaserFilterPaths = {
  BlurX: "/plugins/phaser/filters/BlurX.js",
  BlurY: "/plugins/phaser/filters/BlurY.js",
  ColorMatrix: "/plugins/phaser/filters/ColorMatrixFilter.js",
  Glow: "/plugins/phaser/filters/Glow.js",
  Gray: "/plugins/phaser/filters/Gray.js"
};
var Random = (function () {
  var numbs = "0123456789";
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var func = {};
  func.letter = function (leng) {
    if (leng == null) {
      leng = 10;
    }
    var text = "";
    for (var i = 0; i < leng; i++) {
      text += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return text;
  };
  func.number = function (leng) {
    if (leng == null) {
      leng = 10;
    }
    var numb = "";
    for (var i = 0; i < leng; i++) {
      numb += numbs.charAt(Math.floor(Math.random() * numbs.length));
    }
    return numb;
  };
  func.letnum = function (leng) {
    if (leng == null) {
      leng = 10;
    }
    temp = letters + numbs;
    var letnum = "";
    for (var i = 0; i < leng; i++) {
      letnum += temp.charAt(Math.floor(Math.random() * temp.length));
    }
    return letnum;
  };
  return func;
})();

const VERSION = App.prod ? "4.0.83" : Date.now();
var __mintibuch_toggle = document.getElementById("mintibuch_toggle");
var Minti = (function () {
  var MAX_MINTIBUCH_MINTOS = 1000;
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  var specials = ["ä", "ö", "ü", "ß"];
  var alphabetUpperCase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var specialsUpperCase = ["Ä", "Ö", "Ü", "ß"];
  var alphabetOptions = {
    alphabet: true,
    special: true,
    upperCase: false,
    upperCaseSpecial: false,
    array: true
  };
  /*
   * @mintiAlphabet
   * Sabit alfabe ve özel karakterler,
   * { alphabet: false, special: false, upperCase: true, upperCaseSpecial: true, array: true }
   * -- sadece upperCase istenirse --
   *
   *
   * */
  var mintiAlphabet = function (opts) {
    var options = Object.assign(alphabetOptions, opts);
    var _ret = [];
    if (options.alphabet) {
      _ret = _ret.concat(alphabet);
    }
    if (options.special) {
      _ret = _ret.concat(specials);
    }
    if (options.upperCase) {
      _ret = _ret.concat(alphabetUpperCase);
    }
    if (options.upperCaseSpecial) {
      _ret = _ret.concat(specialsUpperCase);
    }
    if (!options.array) {
      return _ret.join("");
    }
    return _ret;
  };
  var Minti = {
    alphabet: mintiAlphabet,
    mintibuchConfig: {
      width: 1920,
      height: 1080,
      parent: "core",
      enableDebug: false,
      fullScreenTarget: __mintibuch_toggle,
      seed: [(Date.now() * Math.random()).toString()]
    },
    mintibuchConfig1: {
      width: 1813,
      height: 884,
      parent: "core",
      enableDebug: false,
      fullScreenTarget: __mintibuch_toggle,
      seed: [(Date.now() * Math.random()).toString()]
    },
    mintibuchConfig2: {
      width: 1920,
      height: 1080,
      parent: "core",
      enableDebug: false,
      fullScreenTarget: __mintibuch_toggle,
      seed: [(Date.now() * Math.random()).toString()]
    },
    mintibuchConfig3: {
      width: 1825,
      height: 940,
      parent: "core",
      enableDebug: false,
      fullScreenTarget: __mintibuch_toggle,
      seed: [(Date.now() * Math.random()).toString()]
    },
    mintibuchConfigForPhone: {
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
      parent: "core",
      enableDebug: false,
      fullScreenTarget: __mintibuch_toggle,
      seed: [(Date.now() * Math.random()).toString()]
    },
    colors: {
      nom: {
        hex: "#57A9DD",
        rgb: "rgb(87,169,221)",
        dhex: 0x57a9dd
      },
      akk: {
        hex: "#F15A24",
        rgb: "rgb(241,90,36)",
        dhex: 0xf15a24
      },
      dat: {
        hex: "#93278F",
        rgb: "rgb(147,39,143)",
        dhex: 0x93278f
      }
    },
    Types: {
      JUNIOR: "junior",
      TEENAGE: "teenage",
      KIDS: "kids"
    }
  };
  Object.defineProperties(Minti, {
    MAX_MINTIBUCH_MINTOS: {
      get: function () {
        return MAX_MINTIBUCH_MINTOS;
      }
    },
    alphabetOptions: {
      get: function () {
        return alphabetOptions;
      },
      set: function (opts) {
        if (_typeof(opts.array) === "undefined") {
          opts.array = true;
        }
        if (_typeof(opts.special) === "undefined") {
          opts.special = false;
        }
        if (_typeof(opts.alphabet) === "undefined") {
          opts.alphabet = true;
        }
        if (_typeof(opts.upperCase) === "undefined") {
          opts.upperCase = false;
        }
        if (_typeof(opts.upperCaseSpecial) === "undefined") {
          opts.upperCaseSpecial = false;
        }
        alphabetOptions = opts;
      }
    }
  });
  return Minti;
})();
Minti.getCommonBaseURL = function (baseURL) {
  return baseURL
    .replace("teenage/", "")
    .replace("junior/", "")
    .replace("kids/", "");
};
Minti.getMintibuchPageData = function (link) {
  link = window.location.pathname;
  if (typeof App.content.baseURL !== "undefined") {
    link = new URL(App.content.baseURL).pathname.replace(
      "/" + App.type + "/",
      ""
    );
  }
  link = link
    .replace("/web/mintibuch/", "")
    .replace("web/mintibuch/", "")
    .replace("/junior/mintibuch/", "")
    .replace("junior/mintibuch/", "")
    .replace("/teenage/mintibuch/", "")
    .replace("teenage/mintibuch/", "")
    .split("/");

  var pageData;
  for (var key in link) {
    if (!link.hasOwnProperty(key)) {
      continue;
    }
    if (key === "0") {
      pageData = minti_titles[link[key]];
    } else {
      if (pageData) {
        pageData = pageData[link[key]];
      }
    }
  }
  return pageData;
};

Minti.Utils = (function () {
  function isPlainObject(obj) {
    if (typeof obj !== "object" || obj.nodeType || obj === obj.window) {
      return false;
    }
    try {
      if (
        obj.constructor &&
        !{}.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")
      ) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  var isArray = function (value) {
    return (
      value &&
      (typeof value === "undefined" ? "undefined" : _typeof(value)) ===
      "object" &&
      value.constructor === Array
    );
  };
  var isObject = function (value) {
    return (
      value &&
      (typeof value === "undefined" ? "undefined" : _typeof(value)) ===
      "object" &&
      value.constructor === Object
    );
  };
  var keys = function (items) {
    var keys = Object.keys(items);
    if (isArray(items)) {
      keys = keys.map(function (k) {
        return +k;
      });
    }
    return keys;
  };
  var values = function (items) {
    if (isArray(items)) {
      return items;
    }
    return Object.values(items);
  };
  var contains = function (haystack, needle) {
    return values(haystack).indexOf(needle) !== -1;
  };
  var count = function (items) {
    return keys(items).length;
  };
  var _has = function _has(items, key) {
    var defaultValue =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (!isArray(key)) {
      key = ("" + key)
        .replace(/^\[|]/g, "")
        .replace(/\[/g, ".")
        .split(".");
    }
    key = [].concat(toConsumableArray(key));
    var segment = "" + key.shift();
    if (isObject(items)) {
      items = _extends({}, items);
    }
    if (!contains(keys(items), segment)) {
      return [false, defaultValue];
    }
    var target = items[segment];
    if (!key.length) {
      return [true, target];
    }
    return _has(target, key, defaultValue);
  };
  var has = function has(items, key) {
    return _has(items, key);
  };
  var get = function () {
    var defaultValue =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return _has(items, key, defaultValue)[1];
  };
  var sum = function (items) {
    return values(items).reduce(function (carry, n) {
      return carry + +n;
    }, 0);
  };
  var avg = function (items) {
    return sum(items) / count(items);
  };
  var each = function (items, callback) {
    var c = 0;
    var k = keys(items);
    for (var i = 0; i < count(k); i++) {
      if (callback(items[k[i]], k[i], c++) === false) {
        break;
      }
    }
    return items;
  };
  var slice = function (items) {
    var begin =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var end =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (end === null) {
      end = count(items);
    }
    if (isArray(items)) {
      return items.slice(begin, end);
    }
    var result = {};
    if (begin < 0) {
      begin = count(items) + begin;
    }
    if (end < 0) {
      end = count(items) + end;
    }
    each(items, function (value, key, index) {
      if (index >= begin && index < end) {
        result[key] = value;
      }
    });
    return result;
  };
  var reduce = function (items, callback) {
    var result =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    each(items, function (value, key, index) {
      result = callback(result, value, key, index);
    });
    return result;
  };
  var toArray = function (items) {
    return reduce(
      items,
      function (carry, value) {
        if (isObject(value)) {
          value = toArray(value);
        }
        return [].concat(toConsumableArray(carry), [value]);
      },
      []
    );
  };
  var chunk = function (items, size) {
    return reduce(
      [].concat(
        toConsumableArray(Array(Math.ceil(count(items) / size)).keys())
      ),
      function (carry, n) {
        return [].concat(toConsumableArray(carry), [
          slice(items, n * size, (n + 1) * size)
        ]);
      },
      []
    );
  };
  var filter = function (items) {
    var callback =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!callback) {
      callback = function callback(value) {
        return value;
      };
    }
    var result = reduce(
      items,
      function (carry, value, key, index) {
        if (callback(value, key, index)) {
          carry[key] = value;
        }
        return carry;
      },
      {}
    );
    return isObject(items) ? result : values(result);
  };
  var isEmpty = function (items) {
    return !count(items);
  };
  var isNotEmpty = function (items) {
    return !isEmpty(items);
  };
  var isEqual = function (a, b) {
    if (count(a) !== count(b)) {
      return false;
    }
    for (var i = a.length; i--;) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };
  var first = function (items) {
    var callback =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (callback) {
      items = filter(items, callback);
    }
    return isNotEmpty(items) ? values(items)[0] : null;
  };
  var last = function (items) {
    var callback =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (callback) {
      items = filter(items, callback);
    }
    return isNotEmpty(items) ? values(items)[count(items) - 1] : null;
  };
  var map = function (items, callback) {
    var result = {};
    each(items, function (value, key, index) {
      result[key] = callback(value, key, index);
    });
    return isObject(items) ? result : values(result);
  };
  var flatten = function (items) {
    return reduce(
      items,
      function (carry, value) {
        return isArray(value) || isObject(value)
          ? [].concat(
            toConsumableArray(carry),
            toConsumableArray(flatten(value))
          )
          : [].concat(toConsumableArray(carry), [value]);
      },
      []
    );
  };
  var min = function (items) {
    return Math.min.apply(Math, toConsumableArray(values(items)));
  };
  var max = function (items) {
    return Math.max.apply(Math, toConsumableArray(values(items)));
  };
  var unique = function (items) {
    var haystack = [];
    var result = {};
    each(items, function (value, key) {
      if (!contains(haystack, value)) {
        result[key] = value;
        haystack.push(value);
      }
    });
    return isObject(items) ? result : values(result);
  };
  var matrixTranspos = function (items) {
    return items[0].map(function (col, i) {
      return items.map(function (row) {
        return row[i];
      });
    });
  };
  var sort = function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };
  var shuffle = function (items) {
    if (isArray(items) && isNotEmpty(items)) {
      for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = items[i];
        items[i] = items[j];
        items[j] = temp;
      }
      return items;
    }
    return null;
  };
  var deepCopy = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }
    // extend Phaser if only one argument is passed
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          if (!options.hasOwnProperty(name)) {
            continue;
          }
          src = target[name];
          copy = options[name];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if (
            deep &&
            copy &&
            (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = deepCopy(deep, clone, copy);
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };

  var wrapValue = function (value, amount, max, min) {
    if (_typeof(min) === "undefined") {
      min = 0;
    }
    value += amount;
    if (value < min) {
      return max - 1;
    }
    if (value >= max) {
      return min;
    }
    return value;
  };
  var getRandomItem = function (items, startIndex, length) {
    if (isEmpty(items)) {
      return null;
    }
    if (_typeof(startIndex) === "undefined") {
      startIndex = 0;
    }
    if (_typeof(length) === "undefined") {
      length = items.length;
    }
    var randomIndex = startIndex + Math.floor(Math.random() * length);
    return items[randomIndex] === undefined ? null : items[randomIndex];
  };
  var removeRandomItem = function (items, startIndex, length) {
    if (isEmpty(items)) {
      return null;
    }
    if (_typeof(startIndex) === "undefined") {
      startIndex = 0;
    }
    if (_typeof(length) === "undefined") {
      length = items.length;
    }

    var randomIndex = startIndex + Math.floor(Math.random() * length);
    if (randomIndex < items.length) {
      var removed = items.splice(randomIndex, 1);
      return removed[0] === undefined ? null : removed[0];
    }
    return null;
  };
  var numberArray = function (start, end) {
    if (end === undefined || end === null) {
      end = start;
      start = 0;
    }
    var result = [];
    for (var i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  var numberArrayStep = function (start, end, step) {
    if (start === undefined || start === null) {
      start = 0;
    }
    if (end === undefined || end === null) {
      end = start;
      start = 0;
    }
    if (step === undefined) {
      step = 1;
    }
    var result = [];
    var total = Math.max(
      Phaser.Math.roundAwayFromZero((end - start) / (step || 1)),
      0
    );
    for (var i = 0; i < total; i++) {
      result.push(start);
      start += step;
    }
    return result;
  };

  return {
    isArray: isArray,
    isObject: isObject,
    keys: keys,
    values: values,
    contains: contains,
    count: count,
    has: has,
    get: get,
    sum: sum,
    avg: avg,
    each: each,
    slice: slice,
    reduce: reduce,
    toArray: toArray,
    chunk: chunk,
    filter: filter,
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
    isEqual: isEqual,
    first: first,
    last: last,
    map: map,
    flatten: flatten,
    min: min,
    max: max,
    unique: unique,
    sort: sort,
    shuffle: shuffle,
    matrixTranspos: matrixTranspos,
    getRandomItem: getRandomItem,
    removeRandomItem: removeRandomItem,
    deepCopy: deepCopy,
    wrapValue: wrapValue,
    numberArray: numberArray,
    numberArrayStep: numberArrayStep
  };
})();
Minti.Helper = (function () {
  var input = undefined;
  var copyClipboard = function (value) {
    if (!value) {
      return;
    }
    if (!input) {
      input = document.createElement("input");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      input.style.top = "-9999px";
      document.body.appendChild(input);
    }
    input.value = value;
    input.select();
    Lobibox.notify("success", {
      msg: "Kopiert!",
      size: "mini",
      rounded: true,
      sound: false
    });
    document.execCommand("copy");
  };
  var SetCaretAtEnd = function (elem) {
    var elemLen = elem.value.length;
    if (document.selection) {
      elem.focus();
      var oSel = document.selection.createRange();
      oSel.moveStart("character", -elemLen);
      oSel.moveStart("character", elemLen);
      oSel.moveEnd("character", 0);
      oSel.select();
    } else if (elem.selectionStart || elem.selectionStart.toString() === "0") {
      elem.selectionStart = elemLen;
      elem.selectionEnd = elemLen;
      elem.focus();
    }
  };
  var encodeString = function (items, f) {
    if (typeof f === "undefined") {
      return items;
    }
    switch (_typeof(items)) {
      case "string":
        if (f === btoa) {
          return f(escape(items));
        } else {
          return unescape(f(items));
        }
      case "object":
        var tmp = Minti.Utils.isArray(items) ? [] : {};
        for (var key in items) {
          if (items.hasOwnProperty(key)) {
            tmp[key] = encodeString(items[key], f);
          }
        }
        return tmp;
      default:
        return items;
    }
  };
  var _playSound = function (path, callback, args) {
    var x = document.createElement("audio");
    x.setAttribute("src", path);
    x.play();
    x.onended = function () {
      x.remove();
      if (callback) {
        if (args.length === 1) {
          args = args[0];
        }
        callback(args);
      }
    };
    return x;
  };
  var playSound = function (path, callback) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    if (Minti.Utils.isArray(path)) {
      var sounds = [];
      for (i = 0; i < path.length; i++) {
        const pathElement = path[i];
        sounds.push(_playSound(pathElement, callback, args));
      }
      return sounds;
    } else {
      return _playSound(path, callback, args);
    }
  };
  var htmlPopUp = function (parent) {
    if (!parent) {
      parent = $("#core");
    }
    var key = "/web/ortak/img/popup.js.png?v=" + VERSION;
    parent.append(
      '<img src="' + key + '" alt="popup" id="jsPopUp" class="img-fluid hide">'
    );
    $("#jsPopUp").load(key, function () {
      var $popup = $("#jsPopUp");
      $popup
        .attr("src", key)
        .removeClass("hide")
        .css({
          width: "50%",
          top: "25%",
          left: "25%",
          position: "absolute",
          cursor: "pointer"
        });
      TweenMax.from($popup, 0.5, {
        css: { scale: 0 },
        ease: Back.easeOut,
        onComplete: function () {
          $popup.on("click", function () {
            TweenMax.to($popup, 0.5, {
              css: { scale: 0 },
              ease: Back.easeIn,
              onComplete: function () {
                $popup.remove();
              }
            });
          });
        }
      });
    });
  };
  var fullscreen__ = function (e) {
    var element;
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      e.alpha = 1;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      e.alpha = 0;
      if ($("body").find("#col")) {
        element = $("#col").get(0);
      }
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };
  var selectInput = function ($inps, method) {
    if (_typeof($inps) === "undefined") {
      return;
    }
    if (_typeof(method) === "undefined") {
      method = "focus";
    }
    setTimeout(function () {
      var isSelected = false;
      $inps.each(function () {
        if ($(this).val().length === 0) {
          $(this)[method]();
          isSelected = true;
          return false;
        }
      });
      if (!isSelected) {
        $inps.first()[method]();
      }
    }, 1);
  };

  var singularPlural = function (word, haveDots) {
    var obj = {
      word: word,
      singular: "",
      plural: ""
    };
    if (_typeof(haveDots) === "undefined") {
      haveDots = false;
    }
    var arr = word.split("/-");
    obj.singular = arr[0];
    arr[0] = arr[0].replace("das", "die").replace("der", "die");
    if (haveDots) {
      var _dd = [
        arr[0].lastIndexOf("o"),
        arr[0].lastIndexOf("u"),
        arr[0].lastIndexOf("a")
      ];
      var deger = Math.max.apply(
        Math,
        _dd.filter(function (x) {
          return x >= 0;
        })
      );
      var _array = arr[0].split("");
      switch (_dd.indexOf(deger)) {
        case 0:
          _array[deger] = "ö";
          break;
        case 1:
          _array[deger] = "ü";
          break;
        case 2:
          _array[deger] = "ä";
          break;
      }
      arr[0] = _array.join("");
    }
    if (arr[1] === "(Sg.)") {
      arr[0] = undefined;
    } else {
      arr[0] = arr[0] + arr[1];
    }
    obj.plural = arr[0];
    return obj;
  };
  var setWithTime = function (elem, text, time, callback, delay) {
    if (typeof time === "undefined") {
      time = 100;
    }
    if (typeof delay === "undefined") {
      delay = 0;
    }
    var _t = "",
      cnt = 0,
      fn;
    if (typeof elem === "string") {
      elem = $(elem);
    }
    if (elem[0].localName === "input" || elem[0].localName === "textarea") {
      fn = "val";
    } else if (elem[0].localName === "div" || elem[0].localName === "span") {
      fn = "html";
    }
    setTimeout(function () {
      var int = setInterval(function () {
        _t += text[cnt];
        elem[fn](_t);
        cnt++;
        if (cnt === text.length) {
          clearInterval(int);
          if (callback) {
            callback();
          }
        }
      }, time);
    }, delay);
  };

  function limitLengthBy(string, length) {
    if (string.length > length) {
      return string.substr(0, length).trim() + "...";
    }
    return string;
  }

  function FocusFirst() {
    $(".input:not([disabled]):first").focus();
  }

  return {
    Random: Random,
    PopUp: htmlPopUp,
    playSound: playSound,
    FocusFirst: FocusFirst,
    SelectInput: selectInput,
    setWithTime: setWithTime,
    FullScreen: fullscreen__,
    encodeString: encodeString,
    limitLengthBy: limitLengthBy,
    copyClipboard: copyClipboard,
    setCaretAtEnd: SetCaretAtEnd,
    SetCaretAtEnd: SetCaretAtEnd,
    singularPlural: singularPlural
  };
})();
try {
  if (!App.url) {
    App.url = location.origin;
  }
  App.mintibuchUrl =
    (App.cdn.slice(0, App.cdn.length - 1) || App.url) +
    "/web/" +
    App.type +
    "/mintibuch/";

  if (Phaser.VERSION.startsWith("2.")) {
    // Minti.mintibuchConfig.renderer = Phaser.CANVAS;
    Minti.PhaserHelper = (function () {
      function resizev2(_game) {
        // var canvas = _game.canvas;
        // var par = $('#content');
        // var width = par.innerWidth();
        // var desiredRatio = 1920 / 1080;
        // var maxHeight = window.innerHeight - par.offset().top - 190;
        // var maxWidth = maxHeight * desiredRatio;
        // if(maxWidth > width) {
        // 	maxWidth = width - 50;
        // 	maxHeight = maxWidth / desiredRatio;
        // }
        // if(canvas) {
        // 	$('#'+_game.parent).css({ width: maxWidth, height: maxHeight });
        // 	var bTop = $('.breadcrumb');
        // 	if(bTop.length) {
        // 		window.scrollTo({
        // 			top: bTop.offset().top + bTop.outerHeight() + 10 - $('.brand-link').outerHeight(),
        // 			behavior: 'smooth'
        // 		});
        // 	}
        // }

        var canvas = _game.canvas;
        var par = $(".content");
        var windowWidth = par.width();
        var windowHeight = par.height();
        var windowRatio = windowWidth / windowHeight;

        var gameRatio = _game.config.width / _game.config.height;
        canvas.style.width = windowWidth + "px";
        canvas.style.height = windowWidth / gameRatio + "px";
        canvas.style.backgroundColor = "transparent";
      }

      function BootState(nextState) {
        Phaser.State.call(this);
        this.nextState = nextState;
        this.type = App.type;
        if (typeof this.type === "undefined") {
          this.type = "junior";
        }
      }
      BootState.prototype = Object.create(Phaser.State.prototype);
      BootState.prototype.constructor = BootState;
      BootState.prototype.init = function () {
        var _this = this;
        try {
          this.game.input.mouseWheel.stop();
        } catch (e) { }
        this.sound.allowMultiple = false;
        this.time.desiredFps = 60;
        this.time.advancedTiming = true;
        // this.scale.pageAlignVertically = true;
        // this.scale.pageAlignHorizontally = true;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setResizeCallback(function() { if(!this.scale.isFullScreen) { /*resizev2(this.game);*/ } }, this);
        // this.scale.onSizeChange.add(function() {
        // 	var _w;
        // 	if(this.scale.isFullScreen) {
        // 		_w = this.game.canvas.offsetWidth;
        // 	}
        // 	else {
        // 		_w = '100%';
        // 	}
        // 	$('#' + this.game.parent).css({ width: _w });
        // }, this);
      };
      BootState.prototype.preload = function () {
        this.load.image("yaprak", "/web/ortak/img/yaprak.png?v=" + VERSION);
        if (this.type.toString() === "junior") {
          const loaders = ["loader3"];
          const randomIndex = Math.floor(Math.random() * loaders.length);
          this.load.atlas(
            "loading",
            `/web/ortak/img/${loaders[randomIndex]}.png?v=` + VERSION,
            `/web/ortak/img/${loaders[randomIndex]}.json?v=` + VERSION
          );
        } else {
          this.load.image(
            "teenage_loader",
            "/web/ortak/img/logo.png?v=" + VERSION
          );
        }
      };
      BootState.prototype.create = function () {
        this.state.start(this.nextState);
      };

      function PreloadState(nextState, json, core, forNextState) {
        Phaser.State.call(this);
        this.core = core;
        this.data = json;
        this.nextState = nextState;
        this.forNextState = forNextState;
        this.type = App.type;
        if (typeof this.type === "undefined") {
          this.type = "junior";
        }
        if (typeof this.data.defaultItems === "undefined") {
          this.data.defaultItems = true;
        }
      }
      PreloadState.prototype = Object.create(Phaser.State.prototype);
      PreloadState.prototype.constructor = PreloadState;
      PreloadState.prototype.preload = function () {
        this.wait = new Waiting(this.core);
        this.load.crossOrigin = true;
        this.load.audio(
          "dses",
          App.url + "/web/ortak/sound/dogru.mp3?v=" + VERSION
        );
        this.load.audio(
          "yses",
          App.url + "/web/ortak/sound/yanlis.mp3?v=" + VERSION
        );
        this.load.audio(
          "glow",
          App.url + "/web/ortak/sound/glow.mp3?v=" + VERSION
        );
        if (!this.data.image.popup) {
          this.load.image(
            "popup",
            App.url + "/web/ortak/img/popup1.png?v=" + VERSION
          );
        }
        if (this.data.mp3Player) {
          this.load.atlas(
            "mp3player",
            App.url + "/web/ortak/img/mp3player.png?v=" + VERSION,
            App.url + "/web/ortak/img/mp3player.json?v=" + VERSION
          );
        }
        if (this.data.videoPlayer) {
          this.load.image(
            "videoPlayButton",
            App.url + "/web/ortak/img/video-play-button.png?v=" + VERSION
          );
          this.load.image(
            "videoPlay",
            App.url + "/web/ortak/img/video-play.png?v=" + VERSION
          );
          this.load.image(
            "videoPause",
            App.url + "/web/ortak/img/video-pause.png?v=" + VERSION
          );
          this.load.image(
            "videoRestart",
            App.url + "/web/ortak/img/video-restart.png?v=" + VERSION
          );
        }
        if (this.data.olympics) {
          this.load.image(
            "olympics",
            App.url + "/web/ortak/img/olympicsLogo.png?v=" + VERSION
          );
        }

        if (this.data.new) {
          return this.newPreload();
        }
        if (!this.data.image.fullScreen) {
          let isMintiBuchOrLernen = false;
          if (App.content != undefined || App.content != null) {
            let arrayOfContent = App.content.baseURL.toString().split("/");
            for (let i = 0; i < arrayOfContent.length; i++) {
              if (
                arrayOfContent[i] == "mintibuch" ||
                arrayOfContent[i] == "lernen"
              ) {
                isMintiBuchOrLernen = true;
                break;
              }
            }
            if (!isMintiBuchOrLernen) {
              this.load.image(
                "fullScreen",
                //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png'
                App.url + "/web/ortak/img/fullScreen.png?v=" + VERSION
              );
              this.load.image(
                "fullScreenExit",
                //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png'
                App.url + "/web/ortak/img/fullScreenExit.png?v=" + VERSION
              );
            }
          } else {
            this.load.image(
              "fullScreen",

              //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png'

              App.url + "/web/ortak/img/fullScreen.png?v=" + VERSION
            );
            this.load.image(
              "fullScreenExit",
              //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png'
              App.url + "/web/ortak/img/fullScreenExit.png?v=" + VERSION
            );
          }
        }

        this.load.baseURL = this.data.baseURL;
        if (this.data.defaultItems) {
          let isSelectedUnit = false;
          let arrayOfContent = App.content.baseURL.toString().split("/");
          for (let i = 0; i <= arrayOfContent.length - 1; i++) {
            if (
              arrayOfContent[i] === "das-deutsche-abc" ||
              arrayOfContent[i] === "guten-tag" ||
              arrayOfContent[i] === "wer-bist-du" ||
              arrayOfContent[i] === "zahlen" ||
              arrayOfContent[i] === "jahreszeiten-monate-tage" ||
              arrayOfContent[i] === "meine-familie" ||
              arrayOfContent[i] === "wie-spat-ist-es" ||
              arrayOfContent[i] === "woher-kommst-du" ||
              arrayOfContent[i] === "farben-und-adjektive" ||
              arrayOfContent[i] === "mein-tag-clone" ||
              arrayOfContent[i] === "schule-clone" ||
              arrayOfContent[i] === "mein-tag" ||
              arrayOfContent[i] === "schule" ||
              arrayOfContent[i] === "hobbys-und-freizeit-clone" ||
              arrayOfContent[i] === "essen-und-trinken-clone" ||
              arrayOfContent[i] === "essen-und-trinken" ||
              arrayOfContent[i] === "hobbys-und-freizeit" ||
              arrayOfContent[i] === "kleidung" ||
              arrayOfContent[i] === "wie-spat-ist-es-clone" ||
              arrayOfContent[i] === "woher-kommst-du-clone" ||
              arrayOfContent[i] === "farben-und-adjektive-clone" ||
              arrayOfContent[i] === "rund-um-die-schule-clone" ||
              arrayOfContent[i] === "rund-um-die-schule" ||
              arrayOfContent[i] === "tiere-clone" ||
              arrayOfContent[i] === "tiere" ||
              arrayOfContent[i] === "kleidung-clone" ||
              arrayOfContent[i] === "korper-und-gesundheit-clone" ||
              arrayOfContent[i] === "korper-und-gesundheit" ||
              arrayOfContent[i] ===
              "mein-haus-meine-wohnung-mein-zimmer-clone" ||
              arrayOfContent[i] === "mein-haus-meine-wohnung-mein-zimmer" ||
              arrayOfContent[i] === "berufe-clone" ||
              arrayOfContent[i] === "berufe" ||
              arrayOfContent[i] === "unterwegs-clone" ||
              arrayOfContent[i] === "freunde-und-freizeit-clone" ||
              arrayOfContent[i] === "feste-und-geschenke-clone" ||
              arrayOfContent[i] === "eine-zeitreise-clone" ||
              arrayOfContent[i] === "freundschaft-und-gefuhle-clone" ||
              arrayOfContent[i] === "farbtypen-mode-clone" ||
              arrayOfContent[i] === "ernahrung-fitness-und-gesundheit-clone"
            ) {
              isSelectedUnit = true;
              /* this.load.image('bg', `${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/background.jpg`); */
              this.load.image(
                "bg",
                `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/background.jpg`
              );
              break;
            }
          }
          if (!isSelectedUnit) {
            this.load.image("bg", "bg.jpg?v=" + VERSION);
            this.load.image("kaydet", "kaydet.png?v=" + VERSION);
          } else if (isSelectedUnit) {
            this.load.image(
              "mintos",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/mintos.png`
            );
            this.load.image(
              "kaydet",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/speichern.png`
            );
          }
        }

        for (let key in this.data) {
          if (!this.data.hasOwnProperty(key)) {
            continue;
          }
          if (typeof this.data[key] === "object") {
            let subKey;
            if (key === "atlas") {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey][0]}?v=${VERSION}`,
                  `${this.data[key][subKey][1]}?v=${VERSION}`
                );
              }
            } else if (key === "spritesheet") {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey][0]}?v=${VERSION}`,
                  this.data[key][subKey][1],
                  this.data[key][subKey][2],
                  this.data[key][subKey][3] ? this.data[key][subKey][3] : -1
                );
              }
            } else {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey]}?v=${VERSION}`
                );
              }
            }
          } else if (typeof this.data[key] === "string" && key !== "baseURL") {
            this.load[key](key, `${this.data[key]}?v=${VERSION}`);
          }
        }
      };
      PreloadState.prototype.newPreload = function () {
        let baseURL;
        if (App.content) {
          baseURL = App.content.baseURL;
        } else if (App.Spiel) {
          baseURL = App.Spiel.baseURL;
        }
        let common =
          baseURL
            .split("/")
            .slice(0, -3)
            .join("/") +
          "/assets/" +
          App.type +
          "/";
        let commonList = [
          "bg.jpg",
          "puan.png",
          "kaydet.png",
          "kontrol.png",
          "rightArrow.png",
          "fullScreen.png",
          "fullScreenExit.png",
          "anLehrerSenden.png"
        ];
        for (let i = 0; i < commonList.length; i++) {
          let element = commonList[i];
          if (i == 0) {
            this.load.image(
              element.replace(/.jpg|.png/gm, ""),
              "bg.jpg?v="
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/background.jpg`
            );
            continue;
          }

          if (i == 5) {
            let isMintiBuchOrLernen = false;
            let arrayOfContent = App.content.baseURL.toString().split("/");
            for (let i = 0; i < arrayOfContent.length; i++) {
              if (
                arrayOfContent[i] == "mintibuch" ||
                arrayOfContent[i] == "lernen"
              ) {
                isMintiBuchOrLernen = true;
                break;
              }
            }
            if (!isMintiBuchOrLernen) {
              this.load.image(
                element.replace(/.jpg|.png/gm, ""),
                App.url + "/web/ortak/img/fullScreen.png?v=" + VERSION
                //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/fullScreen.png`
              );
            }

            continue;
          }
          if (i == 6) {
            let isMintiBuchOrLernen = false;
            let arrayOfContent = App.content.baseURL.toString().split("/");
            for (let i = 0; i < arrayOfContent.length; i++) {
              if (
                arrayOfContent[i] == "mintibuch" ||
                arrayOfContent[i] == "lernen"
              ) {
                isMintiBuchOrLernen = true;
                break;
              }
            }
            if (!isMintiBuchOrLernen) {
              this.load.image(
                element.replace(/.jpg|.png/gm, ""),
                App.url + "/web/ortak/img/fullScreenExit.png?v=" + VERSION
                //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/fullScreenExit.png`
              );
            }

            continue;
          }
          this.load.image(
            element.replace(/.jpg|.png/gm, ""),
            `${common + element}?v=${VERSION}`
          );
        }
        this.load.baseURL = this.data.baseURL;
        for (let key in this.data) {
          if (!this.data.hasOwnProperty(key)) {
            continue;
          }
          if (typeof this.data[key] === "object") {
            let subKey;
            if (key === "atlas") {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey][0]}?v=${VERSION}`,
                  `${this.data[key][subKey][1]}?v=${VERSION}`
                );
              }
            } else if (key === "spritesheet") {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey][0]}?v=${VERSION}`,
                  this.data[key][subKey][1],
                  this.data[key][subKey][2],
                  this.data[key][subKey][3] ? this.data[key][subKey][3] : -1
                );
              }
            } else {
              for (subKey in this.data[key]) {
                if (!this.data[key].hasOwnProperty(subKey)) {
                  continue;
                }
                this.load[key](
                  subKey,
                  `${this.data[key][subKey]}?v=${VERSION}`
                );
              }
            }
          } else if (typeof this.data[key] === "string" && key !== "baseURL") {
            this.load[key](key, `${this.data[key]}?v=${VERSION}`);
          }
        }
      };
      PreloadState.prototype.create = function () {
        this.wait.removeFromStage();
        this.state.start(this.nextState, true, false, this.forNextState);
      };

      function Waiting(state, text) {
        state.stage.backgroundColor = "#ffffff";
        this.subText = text || "Wird geladen";
        /* this.tile = state.add.tileSprite(
                  state.world.centerX,
                  state.world.centerY,
                  2400,
                  1900,
                  "yaprak"
                ); */
        this.tile = state.add.sprite(
          state.world.centerX,
          state.world.centerY,
          "yaprak"
        );
        this.tile.alpha = 0.4;
        this.tile.angle = -30;
        this.tile.anchor.setTo(0.5);
        if (state.cache.checkImageKey("loading")) {
          this.myLoader = state.add.sprite(
            state.world.centerX,
            state.world.centerY,
            "loading",
            "jonglor_00000"
          );
          this.myLoader.anchor.set(0.5);
          this.myLoader.animations.add("anime");
          var rnd = state.rnd.frac();
          if (rnd < 0.5) {
            this.myLoader.scale.set(-2, 2);
          } else {
            this.myLoader.scale.set(2);
          }
          rnd = state.rnd.frac();
          this.myLoader.animations.play("anime", 10, true);
          /* if (rnd < 0.5) {
                        this.myLoader.animations.play("anime", 4, true);
                    } else {
                        this.myLoader.animations.play("anime", 4, true).reverse();
                    } */
        } else if (state.cache.checkImageKey("teenage_loader")) {
          this.myLoader = state.add.sprite(
            state.world.centerX,
            state.world.centerY,
            "teenage_loader"
          );
          this.myLoader.anchor.setTo(0.5);
          rnd < 0.5 ? (_ang = -359) : (_ang = 359);
          state.add
            .tween(this.myLoader)
            .to({ angle: _ang }, 3000, null, true, 0, Infinity);
        }
        this.avcs = state.add.text(
          state.world.centerX,
          state.world.centerY + 200,
          this.subText,
          {
            font: "60px Amaranth",
            fill: "#000000",
            fillAlpha: 0,
            fontWeight: "bold",
            align: "right"
          }
        );
        this.avcs.anchor.set(0.5);
        this.customTimer = state.time.create(false);
        this.customTimer.loop(
          500,
          function () {
            if (this.avcs.text.indexOf("...") === -1) {
              this.avcs.setText(this.avcs.text + ".");
            } else {
              this.avcs.setText(this.subText);
            }
          },
          this
        );
        this.customTimer.start();
      }
      Waiting.prototype.removeFromStage = function () {
        if (this.tile) {
          this.tile.destroy();
        }
        if (this.avcs) {
          this.avcs.destroy();
        }
        if (this.myLoader) {
          this.myLoader.destroy();
        }
        if (this.customTimer) {
          this.customTimer.destroy();
        }
      };

      function PopUp(state, config) {
        if (document.querySelectorAll(".input")) {
          var inputs = document.querySelectorAll(".input");
          inputs.forEach(function (input) {
            input.style.display = "none";
          });
        }
        if (document.querySelectorAll(".dcevap")) {
          var inputs = document.querySelectorAll(".dcevap");
          inputs.forEach(function (input) {
            input.style.display = "none";
          });
        }
        if (document.querySelectorAll(".divKapsa")) {
          var inputs = document.querySelectorAll(".divKapsa");
          inputs.forEach(function (input) {
            input.style.display = "none";
          });
        }
        if (!config) {
          config = {};
        }
        if (!config.key) {
          config.key = "popup";
        }
        if (typeof config.end === "undefined") {
          config.end = true;
        }
        if (typeof state.id !== "undefined") {
          //game instance
          state = state.states[state.states.current]; //get current state!
        }
        if (config.bg) {
          var gr = state.add.graphics();
          gr.beginFill(0x000000, 0.3);
          gr.drawRect(0, 0, 1920, 1080);
          this.gr = gr;
          state.world.bringToTop(state.kaydet);
          /* if (document.querySelectorAll("input")) {
                                  document.querySelectorAll("input").style.display = "none";
                              } */
        }
        if (state.kaydet && config.end) {
          state.add
            .tween(state.kaydet.scale)
            .to({ x: 1.1, y: 1.1 }, 500, "Linear", true, 0, -1, true);
        }
        Phaser.Sprite.call(
          this,
          state._lastCount ? state : state.game,
          state.world.centerX,
          state.world.centerY,
          config.key
        );
        if (config.x) {
          this.x = config.x;
        }
        if (config.y) {
          this.y = config.y;
        }
        this.anchor.set(0.5);
        this.scale.set(0);
        if (config.callback) {
          this.callback = config.callback;
        }
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputDown.add(this.onInpDown, this);
        var text;
        if (typeof config.text !== "undefined" && config.text) {
          text = state.make.text(0, 0, "", {
            font: "80px Amaranth",
            fontWeight: "bold",
            fill: "#FFF",
            align: "center"
          });
          text.setText(
            config.text || "Die Übung ist zu Ende.\nBitte klick auf Speichern."
          );
          text.anchor.set(0.5);
          this.addChild(text);
        }
        state.add.existing(this);
        state.add
          .tween(this.scale)
          .to({ x: 1, y: 1 }, 500, "Back.easeOut", true);
      }
      PopUp.prototype = Object.create(Phaser.Sprite.prototype);
      PopUp.prototype.constructor = PopUp;
      PopUp.prototype.onInpDown = function () {
        this.inputEnabled = false;
        this.game.add
          .tween(this.scale)
          .to({ x: 0, y: 0 }, 500, "Back.easeIn", true)
          .onComplete.add(function (event) {
            if (this.callback) {
              this.callback();
            }
            if (this.gr) {
              this.gr.destroy();
            }
            if (document.querySelectorAll(".input")) {
              var inputs = document.querySelectorAll(".input");
              inputs.forEach(function (input) {
                input.style.display = "block";
              });
            }
            if (document.querySelectorAll(".dcevap")) {
              var inputs = document.querySelectorAll(".dcevap");
              inputs.forEach(function (input) {
                input.style.display = "block";
              });
            }
            if (document.querySelectorAll(".divKapsa")) {
              var inputs = document.querySelectorAll(".divKapsa");
              inputs.forEach(function (input) {
                input.style.display = "block";
              });
            }
            this.destroy();
          }, this);
      };

      function Card(state, position, properties) {
        Phaser.Group.call(this, state.game);
        this.state = state;
        this.name = properties.name;
        this.scaleTo = properties.scale;
        this.turnTime = 100;

        var bot = this.create(position.x, position.y, properties.key);
        bot.anchor.set(0.5);
        bot.scale.set(properties.scaleTo);
        for (var i = 0; i < properties.child.length; i++) {
          bot.addChild(properties.child[i]);
        }
        bot.scale.x = 0;
        this.bottomCard = bot;

        var top = this.create(position.x, position.y, "cover");
        top.anchor.set(0.5);
        top.scale.set(properties.scaleTo);
        top.inputEnabled = true;
        top.input.useHandCursor = true;
        this.topCard = top;

        if (properties.parent && state[properties.parent]) {
          state[properties.parent].add(this);
        }
        addProperty(this, properties);
      }
      Card.prototype = Phaser.Utils.extend(
        true,
        Card.prototype,
        Phaser.Group.prototype
      );
      Card.prototype.constructor = Card;
      Card.prototype.show = function () {
        this.topCard.inputEnabled = false;
        this.state.add
          .tween(this.topCard.scale)
          .to({ x: 0 }, this.turnTime, "Linear", true)
          .chain(
            this.state.add
              .tween(this.bottomCard.scale)
              .to({ x: this.scaleTo }, this.turnTime, "Linear")
          );
      };
      Card.prototype.hide = function () {
        this.topCard.inputEnabled = true;
        this.topCard.input.useHandCursor = true;
        this.state.add
          .tween(this.bottomCard.scale)
          .to({ x: 0 }, this.turnTime, "Linear", true)
          .chain(
            this.state.add
              .tween(this.topCard.scale)
              .to({ x: this.scaleTo }, this.turnTime, "Linear")
          );
      };

      function Draggable(state, position, _key, properties) {
        Phaser.Button.call(this, state.game, position.x, position.y, _key);
        this.anchor.set(0.5);
        this.input.enableDrag(false, true);
        this.defaultPosition = new Phaser.Point(this.x, this.y);

        if (properties.parent && state[properties.parent]) {
          state[properties.parent].add(this);
        }
        addProperty(this, properties);
      }
      Draggable.prototype = Object.create(Phaser.Button.prototype);
      Draggable.prototype.constructor = Draggable;

      function TwoDots(state, position, _key, properties) {
        Phaser.Button.call(this, state.game, position.x, position.y, _key);
        this.state = state;
        this.anchor.set(0.5);
        this.defaultPosition = new Phaser.Point(position.x, position.y);
        this.input.enableDrag(true, true);
        this.haveSpace = true;
        if (properties.debug) {
          this.inputEnabled = true;
          this.input.enableDrag(true, true);
          this.events.onDragStop.add(function (e) {
            console.log(e.x + ", " + e.y);
            console.log("x: " + e.x + ", y: " + e.y);
          });
        }
        if (properties && properties.parent && state[properties.parent]) {
          state[properties.parent].add(this);
          this.fixed = state[properties.parent].create(
            position.x,
            position.y,
            _key
          );
          this.fixed.anchor.set(0.5);
        } else {
          this.fixed = state.make.image(position.x, position.y, _key);
          this.fixed.anchor.set(0.5);
        }
        addProperty(this, properties);
      }
      TwoDots.prototype = Object.create(Phaser.Button.prototype);
      TwoDots.prototype.constructor = TwoDots;
      TwoDots.prototype.setPosition = function (position) {
        this.x = position.x;
        this.y = position.y;
        this.fixed.x = this.x;
        this.fixed.y = this.y;
        this.defaultPosition = position;
      };
      TwoDots.prototype.createGraphics = function (grap, thik, color, alpha) {
        if (typeof grap === "undefined") {
          grap = this.state.add.graphics();
        }
        if (thik === undefined) {
          thik = 4;
        }
        if (color === undefined) {
          color = 0x009900;
        }
        if (alpha === undefined) {
          alpha = 1;
        }
        grap.beginFill();
        grap.lineStyle(thik, color, alpha);
        grap.moveTo(this.fixed.x, this.fixed.y);
        grap.lineTo(this.x, this.y);
        grap.endFill();
      };

      function MP3Player(state, position, audioKey, properties) {
        if (typeof position === "undefined") {
          position = "default";
        }
        if (typeof position === "number") {
          position = { x: position, y: position };
        }
        if (typeof position === "string" && position === "default") {
          position = { x: 0, y: 1080 };
        }
        if (typeof audioKey !== "undefined") {
          this._audioKey = audioKey;
        }
        if (typeof audioKey === "undefined" || audioKey === null) {
          this._audioKey = undefined;
        }
        var key = "mp3player",
          _width = 1813,
          _height = 60,
          _x = 0,
          _y = 854;
        if (typeof position === "string" && position === "degisecek") {
          _width = 1920;
          _y = 1050;
        }
        if (properties.mp3playerAssets) {
          key = properties.mp3playerAssets;
        }
        if (properties.width) {
          _width = properties.width;
          if (_width < 350) {
            console.warn("MP3Player:: Width property can't set < 350");
            _width = 350;
          }
        }
        if (properties.x) {
          _x = properties.x;
        }
        if (properties.y) {
          _y = properties.y;
        }
        Phaser.Group.call(this, state.game);
        this.name = "mp3Player";
        if (properties.name) {
          this.name = properties.name;
        }
        this._volume = 0.5;
        this.debug = properties.debug || false;
        this._disabled = properties.disabled || false;
        this._autoPlay = properties.autoPlay || false;
        this.state = state;
        this.audio = undefined;
        this.y = _y;
        this.x = _x;
        this.trackTime = this.timeCircleDragging = false;
        var grap = state.make.graphics();
        grap.beginFill(0xf2f3f5, 0.75);
        grap.drawRect(_x, _y, _width, _height);
        grap.endFill();
        var bg = this.create(_x, _y, grap.generateTexture(1, 1, 0));
        bg.anchor.set(0, 0.5);
        this.bg = bg;
        grap.destroy();

        var play = this.game.make.button(30, 0, key);
        play.anchor.set(0.5);
        play.frameName = "play";
        play.alpha = 0.4;
        play.events.onInputDown.add(this._playAudio, this);
        this.playButton = play;
        bg.addChild(play);

        var font = {
          font: "24px Roboto",
          align: "center",
          boundsAlignH: "center",
          boundsAlignV: "middle"
        };
        var timeText = state.make.text(play.x + 70, 3, "00:00", font);
        timeText.anchor.set(0.5);
        this.timeText = timeText;
        bg.addChild(timeText);

        var fullTimeText = state.make.text(timeText.x + 70, 3, "NaN", font);
        fullTimeText.anchor.set(0.5);
        this.fullTimeText = fullTimeText;
        bg.addChild(fullTimeText);

        var snd = state.make.sprite(fullTimeText.x + 70, 0, key, "sound-0.5");
        snd.anchor.set(0.5);
        snd.alpha = 0.4;
        snd.inputEnabled = true;
        snd.input.useHandCursor = true;
        this.sndButton = snd;
        this.bg.addChild(snd);
        if (properties.volume) {
          this._volume = properties.volume;
          snd.frameName = "sound-" + this._volume;
        }

        grap = state.make.graphics();
        grap.moveTo(0, 0);
        grap.lineStyle(8, 0xc2c4c3);
        var _wid = _width - (snd.x + snd.width / 2 + 40);
        grap.lineTo(_wid, 0);
        var bottom = this.create(
          timeText.x + 50,
          0,
          grap.generateTexture(1, 1, 0)
        );
        bottom.anchor.set(0, 0.5);
        bottom.inputEnabled = true;
        bottom.input.useHandCursor = true;
        this.bottomBg = bottom;
        bg.addChild(bottom);
        snd.x = _width - 40;
        fullTimeText.x = snd.x - 70;

        var playerBM = state.make.graphics();
        this.playerBM = playerBM;
        bg.addChild(playerBM);

        var timeCircle = state.make.sprite(bottom.x + 8, 0, key, "circle");
        timeCircle.anchor.set(0.5);
        timeCircle.inputEnabled = true;
        timeCircle.input.useHandCursor = true;
        timeCircle.input.allowVerticalDrag = false;
        this.timeCircle = timeCircle;
        bg.addChild(timeCircle);

        if (properties.parent && state[properties.parent]) {
          state[properties.parent].add(this);
          state[this.name] = this;
        }
        addProperty(this, properties);
        return this;
      }
      MP3Player.prototype = Phaser.Utils.extend(
        true,
        MP3Player.prototype,
        Phaser.Group.prototype
      );
      MP3Player.prototype.constructor = MP3Player;
      MP3Player.prototype._playAudio = function (e) {
        if (e === undefined) {
          e = this.playButton;
        }
        if (typeof this.audio !== "undefined" && !this._disabled) {
          if (this.audio.isFirstStart) {
            this.audio.isFirstStart = false;
            this.audio.finished = false;
            this.audio.play("", 0, this.audio.volume, false, true);
            e.frameName = "pause";
          } else {
            if (this.audio.paused) {
              this.audio.resume();
              e.frameName = "pause";
            } else {
              this.audio.pause();
              e.frameName = "play";
            }
          }
        }
      };
      MP3Player.prototype.onAudioEnd = function () {
        this.playButton.frameName = "replay";
        this.audio.isFirstStart = true;
        this.audio.finished = true;
      };
      MP3Player.prototype.onDragStart = function () {
        this.timeCircleDragging = true;
        this.audio.pause();
      };
      MP3Player.prototype.onDragStop = function () {
        this.timeCircleDragging = false;
        this.onTimeClick();
      };
      MP3Player.prototype.onSoundChange = function (e) {
        if (this.audio) {
          switch (this._volume) {
            case 1:
              this._volume = 0;
              break;
            case 0.5:
              this._volume = 1;
              break;
            default:
              this._volume = 0.5;
              break;
          }
          e.frameName = "sound-" + this._volume;
          this.audio.volume = this._volume;
        }
      };
      MP3Player.prototype.onTimeClick = function (pos) {
        if (this.audio.isFirstStart) {
          this.audio.isFirstStart = false;
          this.audio.play();
        }
        var position = this.game.input.x - this.x;
        if (position < this.bottomBg.x) {
          position = this.bottomBg.x;
        }
        var yuzde = ((position - this.bottomBg.x) * 100) / this.bottomBg.width;
        var mls = (yuzde * this.audio.durationMS) / 100;
        this.audio.startTime += this.audio.currentTime - mls;
        this.audio.pausedPosition = mls;
        this.audio.currentTime = mls;
        this.audio.pause();
        if (position >= this.bottomBg.x + this.bottomBg.width - 12) {
          this.timeCircle.x = this.bottomBg.x + this.bottomBg.width - 13;
          this.audio.isFirstStart = true;
          this.playButton.frameName = "replay";
          this.timeText.setText(formatTime(this.audio.durationMS));
          this.audio.stop();
          return;
        }
        this.playButton.frameName = "pause";
        this.audio.resume();
      };
      MP3Player.prototype.setAudio = function (audioKey, autoPlay) {
        if (this.audio && this.audio.isPlaying) {
          this.audio.stop();
          this.audio.destroy();
        }
        this._audioKey = audioKey;
        this._autoPlay = autoPlay || false;
        this.audio = undefined;
        this._disabled = false;
        this.isFirstStart = true;
        this.playButton.alpha = 0.4;
        this.sndButton.alpha = 0.4;
        this.timeCircle.input.disableDrag();
        this.timeCircle.events.onDragStart.remove(this.onDragStart, this);
        this.timeCircle.events.onDragStop.remove(this.onDragStop, this);
        this.bottomBg.events.onInputDown.remove(this.onTimeClick, this);
        this.sndButton.events.onInputDown.remove(this.onSoundChange, this);
        this.playerBM.clear();
      };
      MP3Player.prototype.disable = function () {
        if (this.audio && this.audio.isPlaying) {
          this.audio.stop();
          this.audio.destroy();
        }
        this._audioKey = undefined;
        this.audio = undefined;
        this._disabled = true;
        this._autoPlay = false;
        this.trackTime = false;
        this.timeText.setText("00:00");
        this.fullTimeText.setText("NaN");
        this.playButton.frameName = "play";
        this.playButton.alpha = this.sndButton.alpha = 0.4;
        this.timeCircle.x = this.bottomBg.x + 8;
        this.timeCircle.input.disableDrag();
        this.timeCircle.events.onDragStart.remove(this.onDragStart, this);
        this.timeCircle.events.onDragStop.remove(this.onDragStop, this);
        this.bottomBg.events.onInputDown.remove(this.onTimeClick, this);
        this.sndButton.events.onInputDown.remove(this.onSoundChange, this);
        this.playerBM.clear();
      };
      MP3Player.prototype.changeAudio = function () {
        this.audio = this.state.add.sound(this._audioKey);
        this.audio.isFirstStart = true;
        this.trackTime = this.audio.finished = false;
        this.audio.volume = this._volume;
        this.sndButton.alpha = this.playButton.alpha = 1;
        this.playButton.frameName = "play";
        this.duration = this.game.cache.getSound(this._audioKey).data.duration;
        var fullTimeText = formatTime(this.duration * 1000);
        this.fullTimeText.setText(
          fullTimeText === "00:00" ? "00:01" : fullTimeText
        );
        this.timeText.setText(formatTime(this.audio.position));
        this.audio.onPlay.add(function () {
          this.trackTime = true;
        }, this);
        this.audio.onResume.add(function () {
          this.trackTime = true;
        }, this);
        this.audio.onPause.add(function () {
          this.trackTime = false;
        }, this);
        this.audio.onStop.add(this.onAudioEnd, this);

        this.timeCircle.x = this.bottomBg.x + 8;
        this.timeCircle.input.enableDrag();
        this.timeCircle.events.onDragStart.add(this.onDragStart, this);
        this.timeCircle.events.onDragStop.add(this.onDragStop, this);
        this.bottomBg.events.onInputDown.add(this.onTimeClick, this);
        this.sndButton.events.onInputDown.add(this.onSoundChange, this);
        if (this._autoPlay) {
          this._playAudio(this.playButton);
        }
      };
      MP3Player.prototype.stop = function () {
        if (this.audio) {
          this.audio.stop();
        }
      };
      MP3Player.prototype.update = function () {
        if (this._audioKey !== undefined && !this._disabled) {
          if (
            this.game.cache.isSoundDecoded(this._audioKey) &&
            this.audio === undefined
          ) {
            this.changeAudio();
          }
        }
        if (this.trackTime) {
          this.timeText.setText(formatTime(this.audio.currentTime));
          var yuzde = (100 * this.audio.currentTime) / this.audio.durationMS;
          this.timeCircle.x =
            (yuzde * (this.bottomBg.width - this.timeCircle.width / 2)) / 100 +
            159;
        }
        if (this.timeCircleDragging) {
          this.timeCircle.y = this.bottomBg.y;
          if (this.timeCircle.x < this.bottomBg.x + 8) {
            this.timeCircle.x = this.bottomBg.x + 8;
          }
          if (this.timeCircle.x > this.bottomBg.x + this.bottomBg.width - 12) {
            this.timeCircle.x = this.bottomBg.x + this.bottomBg.width - 13;
          }
        }
        if (this.timeCircleDragging || this.trackTime) {
          this.playerBM.clear();
          this.playerBM.lineStyle(8, 0x595959);
          this.playerBM.moveTo(this.bottomBg.x, this.bottomBg.y);
          this.playerBM.lineTo(this.timeCircle.x, this.timeCircle.y);
          this.bringToTop(this.timeCircle);
        }
      };
      MP3Player.prototype.destroy = function () {
        if (this.audio && this.audio.isPlaying) {
          this.audio.stop();
          this.audio.destroy();
        }
        Phaser.Group.prototype.destroy.call(this, true);
      };
      MP3Player.prototype.render = function () {
        if (this.debug) {
          if (this.fullTimeText) {
            this.game.debug.spriteBounds(this.fullTimeText);
          }
          if (this.timeText) {
            this.game.debug.spriteBounds(this.timeText);
          }
          if (this.playButton) {
            this.game.debug.spriteBounds(this.playButton);
          }
          if (this.sndButton) {
            this.game.debug.spriteBounds(this.sndButton);
          }
          if (this.bottomBg) {
            this.game.debug.spriteBounds(this.bottomBg);
          }
        }
      };

      function formatTime(time) {
        time = parseInt(time / 1000);
        var minutes = Math.floor(time / 60);
        var seconds = parseInt(time - minutes * 60);
        return (
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds)
        );
      }
      function addProperty(obj, prop) {
        if (!prop) {
          return;
        }
        var und = ["parent", "key", "child", "style"];
        for (var i = 0; i < und.length; i++) {
          prop[und[i]] = undefined;
        }
        for (var key in prop) {
          if (!prop.hasOwnProperty(key)) {
            continue;
          }
          if (typeof prop[key] !== "undefined" || prop[key] !== undefined) {
            if (key === "addChild") {
              if (typeof prop[key] === "object") {
                for (var _k in prop[key]) {
                  if (!prop[key].hasOwnProperty(_k)) {
                    continue;
                  }
                  obj.addChild(prop[key][_k]);
                }
              } else {
                obj.addChild(prop[key]);
              }
            } else {
              if (typeof prop[key] === "object") {
                addProperty(obj[key], prop[key]);
              } else {
                obj[key] = prop[key];
              }
            }
          }
        }
      }
      function addColor(text, subText, color) {
        var subLength = text.text.split(subText)[0].split("\n").length - 1;
        var index = text.text.indexOf(subText) - subLength;
        if (index < 0) {
          return;
        }
        text.addColor(color, index);
        text.addColor(text.style.fill, index + subText.length);
        // old
        // text.addColor(color, text.text.indexOf(subText) - 1);
        // text.addColor('#000000', text.text.indexOf(subText) + subText.length);
      }
      function getText(state, x, y, anchor, text, style, parent) {
        var tx = state.make.text(x, y, text, style);
        if (typeof anchor === "object") {
          for (var key in anchor) {
            if (anchor.hasOwnProperty(key)) {
              tx.anchor[key] = parseFloat(anchor[key]);
            }
          }
        } else {
          tx.anchor.set(anchor);
        }
        if (style && style.lineSpacing) {
          tx.lineSpacing = style.lineSpacing;
        }
        if (parent && state[parent]) {
          state[parent].add(tx);
        }
        return tx;
      }

      function CrosswordPuzzle(state, puzzleData, properties) {
        Phaser.Group.call(this, state.game);
        this.passives = state.make.group(this, "passives");
        this.name = "CrosswordPuzzle";
        this.inputEnableChildren = true;
        this.TYPES = {
          VERTICAL: "VERTICAL",
          HORIZONTAL: "HORIZONTAL"
        };

        this.currentState = state;
        this.focused = false;
        this._total = 0;
        this._subLength = 0;

        var _properties$square = properties.square,
          color1 = _properties$square.color1,
          color2 = _properties$square.color2,
          strokeColor = _properties$square.strokeColor,
          lineWidth = _properties$square.lineWidth;
        var w = puzzleData.width / puzzleData.satir;
        var h = puzzleData.height / puzzleData.sutun;
        var gameData = puzzleData.data.sort(function (a, b) {
          return b.order[0].localeCompare(a.order[0]);
        });

        var shad = state.add.graphics();
        shad.visible = false;
        shad.alpha = 0;
        var tw = this.game.add
          .tween(shad)
          .to({ alpha: 1 }, 750, "Linear", false, 100, 1, true);
        tw.onComplete.add(function () {
          shad.alpha = 0;
          tw.start();
        });
        shad.tw = tw;
        shad.lineStyle(6.5, 0x4a7154, 1);
        shad.beginFill(0x9b005d, 0.2);
        shad.drawCircle(0, 0, w * 1.05);
        shad.endFill();
        this.add(shad);
        this.shadow = shad;

        this.squares = ["", ""];
        for (var n = 0; n < this.squares.length; n++) {
          this.squares[n] = state[properties.debug ? "add" : "make"].graphics();
          this.squares[n].lineStyle(lineWidth, strokeColor, 1);
          this.squares[n]._subColor = n === 0 ? color1 : color2;
          this.squares[n].beginFill(n === 0 ? color1 : color2, 1);
          this.squares[n].drawRect(n === 0 ? w : 0, 0, w, h);
          this.squares[n].endFill();
        }

        if (properties.debug) {
          this.addDebug(puzzleData);
          this.onChildInputDown.add(function (self) {
            console.log("name: " + self.name);
          });
        }

        var sub = [];
        for (var m = 0, farkx = 0, farky = 0; m < puzzleData.sutun; m++) {
          if (m !== 0) {
            farky += h;
          }
          farkx = 0;
          sub[m] = [];
          for (var j = 0; j < puzzleData.satir; j++) {
            sub[m].push([
              puzzleData.startPos.x + w / 2 + farkx,
              puzzleData.startPos.y + h / 2 + farky,
              m + (j % 2)
            ]);
            farkx += w;
          }
        }
        for (var _n = 0; _n < gameData.length; _n++) {
          var ch = gameData[_n];
          ch.ended = false;
          var pars = ch.name.split("_"),
            i,
            child,
            tex,
            __pos;
          var start_x = parseInt(pars[0]),
            start_y = parseInt(pars[1]);
          switch (ch.order) {
            case this.TYPES.VERTICAL:
              for (i = 0; i < ch.word.length; i++) {
                child = this.getByName(start_x + "_" + (start_y + i));
                if (!child) {
                  __pos = sub[start_x][start_y + i];
                  child = this.create(
                    __pos[0],
                    __pos[1],
                    this.squares[__pos[2] % 2].generateTexture()
                  );
                  child.anchor.set(0.5);
                }
                child.name = start_x + "_" + (start_y + i);
                child.addChild(
                  getText(state, 0, 0, 0.5, "", { font: "35px Amaranth" })
                );
                child.alpha = 1;
                child.isEmpty = true;
                child.visible = true;
                child._subType = "square";
                child.cans = ch.word[i].toUpperCase();
                if (properties.autoFill) {
                  child.children[0].setText(child.cans);
                }
                if (properties.help && i === 0) {
                  child.children[0].setText(child.cans);
                  child.isEmpty = false;
                }
                if (child.cans === "SS") {
                  child.cans = "ß";
                }
                child.VERTICAL = ch;
                if (i === 0) {
                  if (ch.key) {
                    tex = getText(
                      this.game,
                      child.x - child.width * 0.75,
                      child.y,
                      0.5,
                      ch.key,
                      {
                        font: "bold 40px Amaranth",
                        fill: "#9b005d"
                      }
                    );
                    this.passives.add(tex);
                  } else if (ch.src) {
                    tex = this.passives.create(
                      ch.srcPos.x,
                      ch.srcPos.y,
                      ch.src
                    );
                    tex.anchor.set(0.5);
                    if (properties.debug) {
                      tex.inputEnabled = true;
                      tex.input.enableDrag(true, true);
                      tex.events.onDragStop.add(function (e) {
                        console.log(e.x + ", " + e.y);
                        console.log("x: " + e.x + ", y: " + e.y);
                      });
                    }
                    tex.inputEnabled = true;
                    tex.input.useHandCursor = true;
                    tex._subParent = child;
                    tex.events.onInputDown.add(function (e) {
                      this.direction = this.TYPES.VERTICAL;
                      this.selectTypingArea(e._subParent);
                    }, this);
                  }
                }
              }
              break;
            case this.TYPES.HORIZONTAL:
              for (i = 0; i < ch.word.length; i++) {
                var char = ch.word[i];
                child = this.getByName(start_x + i + "_" + start_y);
                if (!child) {
                  __pos = sub[start_x + i][start_y];
                  child = this.create(
                    __pos[0],
                    __pos[1],
                    this.squares[__pos[2] % 2].generateTexture()
                  );
                  child.anchor.set(0.5);
                }
                child.name = start_x + i + "_" + start_y;
                child.addChild(
                  getText(state, 0, 0, 0.5, "", { font: "35px Amaranth" })
                );
                child.alpha = 1;
                child.isEmpty = true;
                child.visible = true;
                child._subType = "square";
                child.cans = ch.word[i].toUpperCase();
                if (child.cans === "SS") {
                  child.cans = "ß";
                }
                child.HORIZONTAL = ch;
                if (properties.autoFill) {
                  child.children[0].setText(child.cans);
                }
                if (properties.help && i === 0) {
                  child.children[0].setText(child.cans);
                  child.isEmpty = false;
                }
                if (i === 0) {
                  if (ch.key) {
                    tex = getText(
                      this.game,
                      child.x,
                      child.y - child.height * 0.75,
                      0.5,
                      ch.key,
                      {
                        font: "bold 40px Amaranth",
                        fill: "#9b005d"
                      }
                    );
                    this.passives.add(tex);
                  } else if (ch.src) {
                    tex = this.passives.create(
                      ch.srcPos.x,
                      ch.srcPos.y,
                      ch.src
                    );
                    tex.anchor.set(0.5);
                    if (properties.debug) {
                      tex.inputEnabled = true;
                      tex.input.enableDrag(true, true);
                      tex.events.onDragStop.add(function (e) {
                        console.log(e.x + ", " + e.y);
                        console.log("x: " + e.x + ", y: " + e.y);
                      });
                    }
                    tex.inputEnabled = true;
                    tex.input.useHandCursor = true;
                    tex._subParent = child;
                    tex.events.onInputDown.add(function (e) {
                      this.direction = this.TYPES.HORIZONTAL;
                      this.selectTypingArea(e._subParent);
                    }, this);
                  }
                }
              }
              break;
          }
        }

        if (!properties.debug) {
          this.setAll("input.useHandCursor", true);
          this.onChildInputDown.add(this.selectTypingArea, this);
        }

        this.direction = this.TYPES.VERTICAL;
        this.tempSelectedArr = undefined;
        this.tempSelectedChild = undefined;
        this.initializeKeyboard();
        if (state) {
          state[this.name] = this;
          state["LENGTH"] += this.children.length;
          state.input.onDown.add(function () {
            if (this.focused) {
              this.setAll("alpha", 1);
              this.focused = false;
              this.shadow.visible = false;
              this.tempSelectedChild = undefined;
            }
          }, this);
        }
        if (puzzleData.hint) {
          this.ans = this.passives.create(
            this.game.world.centerX,
            950,
            puzzleData.hint
          );
          this.ans.anchor.set(0.5);
        }

        if (!properties.debug) {
          this.control = this.passives.create(
            1731.602564102564,
            121.45896656534954,
            "control"
          );
          this.control.anchor.set(0.5);
          this.control.inputEnabled = true;
          this.control.input.useHandCursor = true;
          this.control.events.onInputDown.add(this.onControlClick, this);
        }
        this.bringToTop(this.passives);
        this.bringToTop(this.shadow);
        this.shadow.inputEnabled = false;

        this.forEach(function (ch) {
          if (ch._subType === "square") {
            this._subLength++;
          }
        }, this);
      }
      CrosswordPuzzle.prototype = Phaser.Utils.extend(
        true,
        CrosswordPuzzle.prototype,
        Phaser.Group.prototype
      );
      CrosswordPuzzle.prototype.constructor = CrosswordPuzzle;
      CrosswordPuzzle.prototype.addDebug = function (puzzleData) {
        var w = puzzleData.width / puzzleData.satir;
        var h = puzzleData.height / puzzleData.sutun;
        for (var m = 0, farkx = 0, farky = 0; m < puzzleData.sutun; m++) {
          if (m !== 0) {
            farky += h;
          }
          farkx = 0;
          for (var j = 0; j < puzzleData.satir; j++) {
            child = this.create(
              puzzleData.startPos.x + w / 2 + farkx,
              puzzleData.startPos.y + h / 2 + farky,
              this.squares[(m + j) % 2].generateTexture()
            );
            child.anchor.set(0.5);
            child.name = m + "_" + j;
            child.alpha = 0.4;
            farkx += w;
          }
        }
      };
      CrosswordPuzzle.prototype.initializeKeyboard = function () {
        var keys = Minti.alphabet({
          alphabet: false,
          special: false,
          upperCase: true,
          upperCaseSpecial: false
        });
        /**
         * We are adding these keys cause on Turkish keyboard have extra
         */
        keys = keys.concat([
          "QUOTES",
          "CLOSED_BRACKET",
          "QUESTION_MARK",
          "BACKSPACE",
          "SPACEBAR"
        ]);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i],
            _key;
          _key = this.game.input.keyboard.addKey(Phaser.Keyboard[key]);
          _key.onDown.add(this.onKeyboardPress, this);
        }
      };
      CrosswordPuzzle.prototype.onKeyboardPress = function (_ref) {
        if (this.tempSelectedChild) {
          var ind, any;
          if (_ref.event.code === "Backspace") {
            ind = this.tempSelectedArr.indexOf(this.tempSelectedChild);
            if (ind > 0) {
              ind--;
            }
            this.tempSelectedChild = this.tempSelectedArr[ind];
            this.tempSelectedChild.children[0].setText("");
            this.tempSelectedChild.isEmpty = true;
          } else if (_ref.event.code === "Space") {
            ind = this.tempSelectedArr.indexOf(this.tempSelectedChild);
            ind++;
            if (ind >= this.tempSelectedArr.length) {
              ind = 0;
            }
            this.tempSelectedChild = this.tempSelectedArr[ind];
          } else {
            this.tempSelectedChild.isEmpty = false;
            var key = _ref.event.key.toUpperCase();
            if (key === "SS") {
              key = "ß";
            }
            this.tempSelectedChild.children[0].setText(key);
            ind = this.tempSelectedArr.indexOf(this.tempSelectedChild);
            if (!this.tempSelectedChild[this.direction].ended) {
              while (
                this.tempSelectedChild &&
                !this.tempSelectedChild.isEmpty
              ) {
                ind++;
                this.tempSelectedChild = this.tempSelectedArr[ind];
                if (ind >= this.tempSelectedArr.length) {
                  any = this.tempSelectedArr.some(function (ch) {
                    return ch.isEmpty;
                  });
                  if (!any) {
                    break;
                  }
                }
              }
            } else {
              ind++;
              this.tempSelectedChild = this.tempSelectedArr[ind];
              if (ind >= this.tempSelectedArr.length) {
                any = this.tempSelectedArr.some(function (ch) {
                  return ch.isEmpty;
                });
              }
            }
            if (typeof this.tempSelectedChild === "undefined") {
              this.tempSelectedArr[0][this.direction].ended = true;
              var searchFor =
                this.direction === this.TYPES.VERTICAL
                  ? this.TYPES.HORIZONTAL
                  : this.TYPES.VERTICAL;
              var controlFor = this.direction;
              var nextElem = this.tempSelectedArr.filter(function (ch) {
                if (
                  ch[controlFor] === undefined ||
                  ch[searchFor] === undefined
                ) {
                  return false;
                }
                if (ch[controlFor].ended !== undefined) {
                  return ch[controlFor].ended || ch[searchFor].ended;
                }
              });
              if (nextElem.length === 1 && !nextElem[0][searchFor].ended) {
                this.selectTypingArea(nextElem[0]);
              } else if (nextElem.length > 1 || nextElem[0][searchFor].ended) {
                var nextSub = undefined;
                nextElem.forEach(function (ch) {
                  if (!ch[searchFor].ended || !ch[controlFor].ended) {
                    nextSub = ch;
                  }
                });
                if (nextSub !== undefined) {
                  this.selectTypingArea(nextSub);
                } else {
                  nextSub = this.children.find(function (ch) {
                    return ch.isEmpty;
                  }, this);
                  if (typeof nextSub === "undefined") {
                    if (this.focused) {
                      this.setAll("alpha", 1);
                      this.focused = false;
                      this.shadow.visible = false;
                    }
                  } else {
                    this.selectTypingArea(nextSub);
                  }
                }
              }
            }
          }
          if (this.tempSelectedChild) {
            this.shadow.tw.start(0);
            this.shadow.x = this.tempSelectedChild.x;
            this.shadow.y = this.tempSelectedChild.y;
          }
        }
      };
      CrosswordPuzzle.prototype.selectTypingArea = function (elem) {
        this.focused = true;
        var parse, start_x, start_y, i, _n;
        if (this.tempSelectedArr) {
          if (this.tempSelectedArr.indexOf(elem) > -1) {
            if (
              this.direction === this.TYPES.VERTICAL &&
              elem[this.TYPES.HORIZONTAL]
            ) {
              this.direction = this.TYPES.HORIZONTAL;
            } else if (
              this.direction === this.TYPES.HORIZONTAL &&
              elem[this.TYPES.VERTICAL]
            ) {
              this.direction = this.TYPES.VERTICAL;
            } else {
              this.tempSelectedArr = undefined;
            }
          }
        }
        if (elem[this.direction]) {
          if (!elem[this.direction].childs) {
            elem[this.direction].childs = [];
            parse = elem[this.direction].name.split("_");
            start_x = parseInt(parse[0]);
            start_y = parseInt(parse[1]);
            for (i = 0; i < elem[this.direction].word.length; i++) {
              if (this.direction === this.TYPES.VERTICAL) {
                _n = start_x + "_" + (start_y + i);
              } else {
                _n = start_x + i + "_" + start_y;
              }
              elem[this.direction].childs.push(_n);
            }
          }
        } else {
          if (this.direction === this.TYPES.VERTICAL) {
            this.direction = this.TYPES.HORIZONTAL;
          } else {
            this.direction = this.TYPES.VERTICAL;
          }
          this.selectTypingArea(elem);
        }
        this.selectChild(elem, this.direction);
      };
      CrosswordPuzzle.prototype.selectChild = function (elem, direction) {
        this.tempSelectedArr = this.children.filter(function (ch) {
          return elem[direction].childs.indexOf(ch.name) > -1;
        });
        this.tempSelectedArr.sort(function (a, b) {
          return (
            parseInt(a.name.split("_")[0]) - parseInt(b.name.split("_")[0])
          );
        });
        this.tempSelectedArr.forEach(function (ch) {
          ch.alpha = 1;
        });
        this.tempSelectedChild = this.tempSelectedArr.find(function (ch) {
          return ch.isEmpty;
        });
        if (this.tempSelectedChild === undefined) {
          this.tempSelectedChild = elem;
        }
        this.shadow.tw.start(0);
        this.shadow.visible = true;
        this.shadow.x = this.tempSelectedChild.x;
        this.shadow.y = this.tempSelectedChild.y;
      };
      CrosswordPuzzle.prototype.onControlClick = function (e) {
        e.kill();
        this.ignoreChildInput = true;
        if (this.ans) {
          this.ans.loadTexture("answer", 0);
        }
        this.setAll("alpha", 1);
        this.focused = false;
        this.shadow.visible = false;
        this.tempSelectedArr = undefined;
        this.tempSelectedChild = undefined;
        this.forEach(function (ch) {
          if (ch._subType === "square") {
            if (ch.cans === ch.children[0].text) {
              ch.children[0].fill = "#009900";
              this._total += 1000 / this._subLength;
            } else {
              ch.children[0].fill = "#ee0000";
            }
          }
        }, this);
        this.currentState.total = this._total;
        this.currentState.puanText.setText(Math.round(this._total));
      };

      function VideoPlayer(state, config) {
        Phaser.Group.call(this, state.game);
        this.x = state.world.centerX;
        this.y = state.world.centerY;
        this.state = state;
        this.name = "VideoPlayer";
        this.inputEnableChildren = true;
        this.config = config;

        this.showButtons = true;
        var autoPlay = config.autoPlay || false;
        if (typeof config.showButtons !== "undefined") {
          this.showButtons = config.showButtons;
        }

        this.img = this.create(this.x, this.y);
        this.img.anchor.set(0.5);
        if (config.imageClick) {
          Minti.PhaserHelper.buttonify(this.img);
          this.img.events.onInputDown.add(this.onImageClick, this);
        }

        this.onComplete = new Phaser.Signal();
        this.onPlay = new Phaser.Signal();

        if (config && config.parent && state[config.parent]) {
          state[config.parent].add(this);
        }

        if (autoPlay) {
          this.addVideo();
        } else {
          var playBG = this.create(
            config.x || this.x,
            config.y || this.y,
            config.key || "videoPlayButton"
          );
          playBG.anchor.set(0.5);
          playBG.blendMode = Phaser.blendModes.MULTIPLY;
          Minti.PhaserHelper.buttonify(playBG);
          playBG.events.onInputDown.add(this.addVideo, this);
        }

        return this;
      }
      VideoPlayer.prototype = Phaser.Utils.extend(
        true,
        VideoPlayer.prototype,
        Phaser.Group.prototype
      );
      VideoPlayer.prototype.constructor = VideoPlayer;
      VideoPlayer.prototype.onImageClick = function (e) {
        if (this.videoElement.paused) {
          this.playVideo();
        } else {
          this.pauseVideo();
        }
      };
      VideoPlayer.prototype.addVideo = function (e) {
        if (e) {
          e.destroy();
        }
        var vid = this.state.add.video(this.config.source);
        this.img.loadTexture(vid, 0);
        vid.currentTime = 0;

        vid.onPlay = this.onPlay;
        vid.onComplete = this.onComplete;
        this.onComplete.add(this.finished, this);

        if (this.showButtons) {
          var play = this.state.make.button(
            0,
            -100,
            "videoPlay",
            this.playVideo,
            this
          );
          play.anchor.set(0.5);
          play.x = -this.img.width / 2 - play.width / 2;
          this.img.addChild(play);
          var pause = this.state.make.button(
            play.x,
            play.y,
            "videoPause",
            this.pauseVideo,
            this
          );
          pause.anchor.set(0.5);
          this.img.addChild(pause);
          var restart = this.state.make.button(
            play.x,
            100,
            "videoRestart",
            this.restartVideo,
            this
          );
          restart.anchor.set(0.5);
          this.img.addChild(restart);
          play.visible = false;
          this.playButton = play;
          this.pauseButton = pause;
          this.restartButton = restart;
        }

        vid.play();
        this.videoElement = vid;
      };
      VideoPlayer.prototype.pauseVideo = function () {
        this.videoElement.paused = true;
        if (this.showButtons) {
          this.playButton.visible = true;
          this.pauseButton.visible = false;
          console.log("pauseVideo");
        }
      };
      VideoPlayer.prototype.playVideo = function () {
        this.onPlay.dispatch(this);
        this.videoElement.paused = false;
        if (this.showButtons) {
          this.playButton.visible = false;
          this.pauseButton.visible = true;
          console.log("playVideo");
        }
      };
      VideoPlayer.prototype.finished = function () {
        if (this.videoElement) {
          this.videoElement.currentTime = 0;
          this.videoElement.paused = true;
        }
        if (this.showButtons) {
          this.playButton.visible = true;
          this.pauseButton.visible = false;
          console.log("finished!!");
        }
      };
      VideoPlayer.prototype.restartVideo = function (e) {
        this.videoElement.currentTime = 0;
        this.videoElement.paused = true;
        this.state.add.tween(e).to({ angle: 360 }, 250, "Back.easeOut", true);
        this.playVideo();
        console.log("restartVideo");
      };
      VideoPlayer.prototype.destroy = function () {
        this.onComplete.dispose();
        this.videoElement.destroy();
        Phaser.Group.prototype.destroy.call(this, true);
      };

      return {
        change: {
          volume: function () {
            if (this.sound.volume) {
              this.add.tween(this.sound).to({ volume: 0 }, 500, "Linear", true);
              this.add
                .tween(this.soundBtn)
                .to({ alpha: 0 }, 500, "Linear", true);
            } else {
              this.add.tween(this.sound).to({ volume: 1 }, 500, "Linear", true);
              this.add
                .tween(this.soundBtn)
                .to({ alpha: 1 }, 500, "Linear", true);
            }
          },
          fullScreen: function (fButton) {
            fButton.game.scale.fullScreenTarget = document.getElementById(
              "mintibuch_toggle"
            );
            if (!fButton.game.scale.isFullScreen) {
              fButton.alpha = 0;
              fButton.game.scale.startFullScreen(false, "when-not-mouse");
              fButton.game.scale.setShowAll();
              fButton.game.scale.refresh();
            } else {
              fButton.alpha = 1;
              fButton.game.scale.stopFullScreen();
              fButton.game.scale.refresh();
            }

            var state = fButton.game.state.states[fButton.game.state.current];
            if ("setFontSize" in state) {
              state.setFontSize();
            }
          }
        },
        onInput: {
          Over: function (e) {
            e.scaleBack = e.scale.x;
            var scaleTo = e.scaleTo ? e.scaleTo : 1.1;
            if (e.tintTo) {
              e.tint = e.tintTo;
            }
            if (e.parent && e.parent.bringToTop) {
              //e.parent.bringToTop(e);
            }
            e.game.add
              .tween(e.scale)
              .to({ x: scaleTo, y: scaleTo }, 150, "Back.easeOut", true);
          },
          OverForWortschatz: function (e) {
            var scaleTo = e.scaleTo ? e.scaleTo : 1.1;
            if (e.tintTo) {
              e.tint = e.tintTo;
            }
            if (e.parent && e.parent.bringToTop) {
              //e.parent.bringToTop(e);
            }
            e.game.add
              .tween(e.scale)
              .to({ x: scaleTo, y: scaleTo }, 150, "Back.easeOut", true);
          },
          Out: function (e) {
            var scaleBack = e.scaleBack ? e.scaleBack : 1;
            if (e.tintTo) {
              e.tint = 0xffffff;
            }
            e.game.add.tween(e.scale).to(
              {
                x: scaleBack,
                y: scaleBack
              },
              150,
              "Back.easeOut",
              true
            );
          },
          OutForWortschatz: function (e) {
            var scaleBack = e.scaleBack ? e.scaleBack : 0.7;
            if (e.tintTo) {
              e.tint = 0xffffff;
            }
            e.game.add.tween(e.scale).to(
              {
                x: scaleBack,
                y: scaleBack
              },
              150,
              "Back.easeOut",
              true
            );
          }
        },

        Card: Card,
        PopUp: PopUp,
        twoDots: TwoDots,
        TwoDots: TwoDots,
        Waiting: Waiting,
        Draggable: Draggable,
        BootState: BootState,
        MP3Player: MP3Player,
        VideoPlayer: VideoPlayer,
        PreloadState: PreloadState,
        CrosswordPuzzle: CrosswordPuzzle,

        getText: getText,
        addColor: addColor,
        isMobile: function (state) {
          if (!state) {
            return false;
          }
          state = state.game;
          return (
            state.device.iPad ||
            state.device.iPhone ||
            state.device.iPhone4 ||
            state.device.android ||
            state.device.cordova ||
            state.device.mobileSafari
          );
        },
        isDesktop: function (state) {
          if (!state) {
            return false;
          }
          state = state.game;
          return (
            state.device.desktop || state.device.macOS || state.device.linux
          );
        },
        getFilters: function (keys) {
          if (typeof keys === "string") {
            keys = [keys];
          }
          var sub = {};
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (PhaserFilterPaths.hasOwnProperty(key)) {
              sub[key] = App.url + PhaserFilterPaths[key];
            }
          }
          return sub;
        },
        buttonify: function (btn, draggable) {
          btn.inputEnabled = true;
          btn.input.useHandCursor = true;
          if (draggable) {
            btn.input.enableDrag(true, true);
            btn.defaultPosition = new Phaser.Point(btn.x, btn.y);
          } else {
            btn.input.disableDrag();
          }
        },
        canFullScreen: function (state) {
          if (!state) {
            return false;
          }
          state = state.game;
          return (
            state.device.fullscreen &&
            !state.device.mobileSafari &&
            !state.device.safari
          );
        },
        arrangeButton: function (obj, bool) {
          if (typeof bool === "undefined") {
            bool = true;
          }
          if (Array.isArray(obj)) {
            obj.forEach(function (child) {
              this.arrangeButton(child, bool);
            });
          } else {
            obj.alpha = bool ? 1 : 0.4;
            obj.inputEnabled = bool;
            obj.input.useHandCursor = bool;
          }
        },
        addDotsToTop: function (state, obje, point, extra, manuel) {
          var bmd = state.add.graphics(0, 0);
          bmd.beginFill(0x000000, 1);
          if (extra) {
            bmd.drawCircle(0, 0, 15);
            bmd.drawCircle(20, 0, 15);
          } else {
            bmd.drawCircle(0, 0, 5);
            bmd.drawCircle(7, 0, 5);
          }
          bmd.x = point.x;
          bmd.y = point.y;
          obje.addChild(bmd);
        },
        intersection: function (spriteA, spriteB) {
          var boundsA = spriteA.getBounds();
          var boundsB = spriteB.getBounds();
          return Phaser.Rectangle.intersection(boundsA, boundsB);
        },
        checkOverlap: function (spriteA, spriteB) {
          var boundsA = spriteA.getBounds();
          var boundsB = spriteB.getBounds();
          return Phaser.Rectangle.intersects(boundsA, boundsB);
        },
        createGraph: function (state, obj) {
          var gr = state.make.graphics();
          if (obj.lineStyle) {
            gr.lineStyle(
              obj.lineStyle[0] ? obj.lineStyle[0] : 5,
              obj.lineStyle[1] ? obj.lineStyle[1] : 0xf00ff,
              obj.lineStyle[2] ? obj.lineStyle[2] : 1
            );
          } else {
            gr.lineStyle(0);
          }
          gr.beginFill(
            obj.beginFill && obj.beginFill.color
              ? obj.beginFill.color
              : 0xff00ff,
            obj.beginFill && obj.beginFill.alpha ? obj.beginFill.alpha : 1
          );
          switch (obj.type) {
            case "rect":
              gr.drawRect(
                0,
                0,
                obj.width ? obj.width : 100,
                obj.height ? obj.height : 100
              );
              break;
            case "rrect":
              gr.drawRoundedRect(
                0,
                0,
                obj.width ? obj.width : 100,
                obj.height ? obj.height : 100,
                obj.round ? obj.round : 100
              );
              break;
            case "circle":
              gr.drawCircle(
                obj.x ? obj.x : 0,
                obj.y ? obj.y : 0,
                obj.dia ? obj.dia : 50
              );
              break;
          }
          gr.endFill();
          return gr;
        },
        createSquare: function (state, fill, width, height, round) {
          if (typeof fill === "undefined" || fill === null) {
            fill = 0xff00ff;
          }
          if (typeof width === "undefined") {
            width = 100;
          }
          if (typeof height === "undefined") {
            height = 25;
          }
          var graphics = state.make.graphics();
          graphics.boundsPadding = 0;
          graphics.clear();
          graphics.beginFill(fill);
          if (!round) {
            graphics.drawRect(0, 0, width, height);
          } else {
            graphics.drawRoundedRect(0, 0, width, height, round);
          }
          graphics.endFill();
          return graphics;
        },
        showMiddle: function () {
          let grap = this.add.graphics();
          grap.lineStyle(4, 0xffd900, 1);
          grap.moveTo(960, 0);
          grap.lineTo(960, 1080);
          grap.moveTo(0, 540);
          grap.lineTo(1920, 540);
          grap.endFill();
        },
        showOutline: function (scene, image) {
          let grap = scene.add.graphics();
          grap.lineStyle(4, 0xffd900, 1);
          grap.drawRect(image.left, image.top, image.width, image.height);
          grap.endFill();
        }
      };
    })();
    
    Minti.Scene = {
      arrangeDefaultButtons: function (header, pointable, isChangedUnit) {
        if (typeof header === "undefined") {
          if (this.hasOwnProperty("headers") && Array.isArray(this.headers)) {
            header = this.headers[0];
          } else {
            header = "";
          }
        }
        if (typeof pointable === "undefined") {
          pointable = true;
        }
        this.header = this.add.text(50, 30, header, minti_phaser.baslik_1);
        this.header.lineSpacing = -10;

        let savePosX = 1565,
          savePozY = 52;
        if (!isChangedUnit || isChangedUnit === "undefined") {
          savePosX = 1500;
          console.log(savePosX, isChangedUnit);
        }
        if (pointable) {
          this.kaydet = this.add.button(
            savePosX,
            savePozY,
            "kaydet",
            this.sendUserData,
            this
          );
          this.kaydet.anchor.set(0.5);
          if (isChangedUnit) {
            this.mintos = this.add.image(1720, 52, "mintos");
            this.mintos.anchor.set(0.5);
          }

          this.puanText = this.add.text(1725, 52, "0", {
            font: "bold 30px Amaranth",
            align: "center",
            fill: "#ffffff"
          });
          this.puanText.anchor.set(0.5);
        }

        if (App.content != undefined || App.content != null) {
          let isMintiBuchOrLernen = false;
          let arrayOfContent = App.content.baseURL.toString().split("/");
          for (let i = 0; i < arrayOfContent.length; i++) {
            if (
              arrayOfContent[i] == "mintibuch" ||
              arrayOfContent[i] == "lernen"
            ) {
              isMintiBuchOrLernen = true;
              break;
            }
          }
          if (!isMintiBuchOrLernen) {
            if (typeof this.addFullScreenButtons === "undefined") {
              this.addFullScreenButtons = Minti.Scene.addFullScreenButtons.bind(
                this
              );
            }
            this.addFullScreenButtons();
          }
        }

        if (typeof this.addDefaultSounds === "undefined") {
          this.addDefaultSounds = Minti.Scene.addDefaultSounds.bind(this);
        }
        this.addDefaultSounds();

        if (!this.getSocketValidation) {
          this.getSocketValidation = Minti.Scene.getSocketValidation.bind(this);
        }
        this.getSocketValidation();
      },
      sendUserData: function (e) {
        e.destroy();
        //console.log(this.total);
        socket.emit(
          "mintibuchPointSave",
          Math.round(this.total),
          this.validation
        );
      },
      addFullScreenButtons: function (x, y, scale, fse, fs) {
        if (typeof x === "undefined") {
          x = 1835;
        }
        if (typeof y === "undefined") {
          y = 19;
        }
        if (typeof scale === "undefined") {
          scale = 0.3;
        }
        if (typeof fse === "undefined") {
          fse = "fullScreenExit";
        }
        if (typeof fs === "undefined") {
          fs = "fullScreen";
        }
        if (Minti.PhaserHelper.canFullScreen(this)) {
          this.fullScreenButtonExit = this.add.image(x, y, fse);
          this.fullScreenButtonExit.scale.setTo(scale);
          this.fullScreenButton = this.add.button(
            x,
            y,
            fs,
            Minti.PhaserHelper.change.fullScreen,
            this
          );
          this.fullScreenButton.scale.setTo(scale);
          this.fullScreenButton.alpha = this.game.scale.isFullScreen ? 0 : 1;
        }
      },
      setMintos: function (puan) {
        if (typeof puan === "number") {
          this.total += puan;
        }
        if (this.total > 1000) {
          this.total = 1000;
        }
        this.puanText.setText(Math.round(this.total).format());
      },
      setHeader: function (header) {
        if (!this.header) {
          this.header = this.add.text(55, 123, header, minti_phaser.baslik_1);
          this.header.anchor.set(0, 1);
          this.header.lineSpacing = -10;
        }
        this.header.text = header;
        this.header.fontSize = 40;
        while (this.header.height > 110) {
          this.header.fontSize--;
        }
      },
      arrangeDefaultButtons1: function (header, pointable) {
        if (typeof header === "undefined") {
          if (this.hasOwnProperty("headers") && Array.isArray(this.headers)) {
            header = this.headers[0];
          } else {
            header = "";
          }
        }
        if (typeof pointable === "undefined") {
          pointable = true;
        }
        if (typeof this.setHeader === "undefined") {
          this.setHeader = Minti.Scene.setHeader.bind(this);
        }
        this.setHeader(header);

        if (pointable) {
          // this.control = this.add.button(1295.6, 73.75, 'kontrol');
          // this.control.anchor.set(.5);
          this.kaydet = this.add.button(
            1503.68,
            73.75,
            "kaydet",
            this.sendUserData,
            this
          );
          this.kaydet.anchor.set(0.5);
          let puanYer = this.add.image(1693.4, 73.75, "puan");
          puanYer.anchor.set(0.5);
          this.puanText = this.add.text(1717.5, puanYer.y, 0, {
            font: "bold 25px Roboto",
            align: "center",
            fill: "#ffffff"
          });
          this.puanText.anchor.set(0.5);
          if (App && App.type === "junior") {
            this.kaydet.x -= 40;
            puanYer.x -= 20;
            this.puanText.x -= 25;
            this.puanText.setStyle({
              font: "bold 40px Noteworthy",
              align: "center",
              fill: "#ffffff"
            });
          }
        }
        if (App.content != undefined || App.content != null) {
          let isMintiBuchOrLernen1 = false;
          let arrayOfContent = App.content.baseURL.toString().split("/");
          for (let i = 0; i < arrayOfContent.length; i++) {
            if (
              arrayOfContent[i] == "mintibuch" ||
              arrayOfContent[i] == "lernen"
            ) {
              isMintiBuchOrLernen1 = true;
              break;
            }
          }
          if (!isMintiBuchOrLernen1) {
            if (typeof this.addFullScreenButtons === "undefined") {
              this.addFullScreenButtons = Minti.Scene.addFullScreenButtons.bind(
                this
              );
            }
            this.addFullScreenButtons(1773, 28.9, 1);
          }
        }

        if (!this.addDefaultSounds) {
          this.addDefaultSounds = Minti.Scene.addDefaultSounds.bind(this);
        }
        this.addDefaultSounds();

        if (!this.getSocketValidation) {
          this.getSocketValidation = Minti.Scene.getSocketValidation.bind(this);
        }
        this.getSocketValidation();
      },
      getSocketValidation: function () {
        var _this = this;
        socket.emit("mintibuchPage");
        socket.on("mintibuchValidation", function (v) {
          _this.validation = v;
        });
        socket.on("reconnect", function () {
          socket.emit("mintibuchPage");
        });
      },
      addDefaultSounds: function () {
        if (this.cache.checkSoundKey("dses")) {
          this.ds = this.add.sound("dses", 0.1);
        }
        if (this.cache.checkSoundKey("glow")) {
          this.gl = this.add.sound("glow", 0.1);
        }
        if (this.cache.checkSoundKey("yses")) {
          this.ys = this.add.sound("yses", 0.1);
        }
      }
    };
    
    Phaser.GameObjectFactory.prototype.multiply = function (
      x,
      y,
      key,
      frame,
      group
    ) {
      var image = this.image(x, y, key, frame, group);

      image.blendMode = Phaser.blendModes.MULTIPLY;

      return image;
    };
    Phaser.GameObjectCreator.prototype.multiply = function (
      x,
      y,
      key,
      frame,
      group
    ) {
      var image = this.image(x, y, key, frame, group);

      image.blendMode = Phaser.blendModes.MULTIPLY;

      return image;
    };

    Phaser.GameObjectFactory.prototype.draggable = function (x, y, key, data) {
      var image = this.image(x, y, key);
      image.data = data;
      Minti.PhaserHelper.buttonify(image, true);
      return image;
    };
    Phaser.GameObjectCreator.prototype.draggable = function (x, y, key, data) {
      var image = this.image(x, y, key);
      image.data = data;
      Minti.PhaserHelper.buttonify(image, true);
      return image;
    };

    window.BootState = Minti.PhaserHelper.BootState;
    window.PreloadState = Minti.PhaserHelper.PreloadState;
    window.PopUp = Minti.PhaserHelper.PopUp;

  } else if (Phaser.VERSION.startsWith("3.")) {
    Minti.Events = Minti.events = new Phaser.Events.EventEmitter();

    Minti.Scene = {
      arrangeDefaultButtons: function (header, pointable, isChangedUnit) {
        if (typeof header === "undefined") {
          if (this.hasOwnProperty("headers") && Array.isArray(this.headers)) {
            header = this.headers[0];
          } else {
            header = "";
          }
        }
        if (typeof pointable === "undefined") {
          pointable = true;
        }
        this.header = this.add.text(50, 30, header, minti_phaser.baslik_1);
        this.header.lineSpacing = -10;

        let savePosX = 1565,
          savePozY = 52;
        if (!isChangedUnit || isChangedUnit === "undefined") {
          savePosX = 1500;
          console.log(savePosX, isChangedUnit);
        }
        if (pointable) {
          /*  this.kaydet = this.add.button(savePosX, savePozY, 'kaydet', this.sendUserData, this);
                               this.kaydet.anchor.set(0.5); */
          this.kaydet = this.add
            .image(savePosX, savePozY, "kaydet")
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.sendUserData);
          this.kaydet.setOrigin(0.5, 0.5);
          if (isChangedUnit) {
            this.mintos = this.add.image(1720, 52, "mintos");
            this.mintos.anchor.set(0.5);
          }

          this.puanText = this.add.text(1725, 52, "0", {
            font: "bold 30px Amaranth",
            align: "center",
            fill: "#ffffff"
          });
          this.puanText.anchor.set(0.5);
        }

        if (App.content != undefined || App.content != null) {
          let isMintiBuchOrLernen = false;
          let arrayOfContent = App.content.baseURL.toString().split("/");
          for (let i = 0; i < arrayOfContent.length; i++) {
            if (
              arrayOfContent[i] == "mintibuch" ||
              arrayOfContent[i] == "lernen"
            ) {
              isMintiBuchOrLernen = true;
              break;
            }
          }
          if (!isMintiBuchOrLernen) {
            if (typeof this.addFullScreenButtons === "undefined") {
              this.addFullScreenButtons = Minti.Scene.addFullScreenButtons.bind(
                this
              );
            }
            this.addFullScreenButtons();
          }
        }

        if (typeof this.addDefaultSounds === "undefined") {
          this.addDefaultSounds = Minti.Scene.addDefaultSounds.bind(this);
        }
        this.addDefaultSounds();

        if (!this.getSocketValidation) {
          this.getSocketValidation = Minti.Scene.getSocketValidation.bind(this);
        }
        this.getSocketValidation();
      },
      sendUserData: function (e) {
        e.destroy();
        console.log(this.total);
        socket.emit(
          "mintibuchPointSave",
          Math.round(this.total),
          this.validation
        );
      },
      addFullScreenButtons: function (x, y, scale, fse, fs) {
        if (typeof x === "undefined") {
          x = 1835;
        }
        if (typeof y === "undefined") {
          y = 19;
        }
        if (typeof scale === "undefined") {
          scale = 0.3;
        }
        if (typeof fse === "undefined") {
          fse = "fullScreenExit";
        }
        if (typeof fs === "undefined") {
          fs = "fullScreen";
        }
        if (Minti.PhaserHelper.canFullScreen(this)) {
          this.fullScreenButtonExit = this.add.image(x, y, fse);
          this.fullScreenButtonExit.scale.setTo(scale);
          this.fullScreenButton = this.add.button(
            x,
            y,
            fs,
            Minti.PhaserHelper.change.fullScreen,
            this
          );
          this.fullScreenButton.scale.setTo(scale);
          this.fullScreenButton.alpha = this.game.scale.isFullScreen ? 0 : 1;
        }
      },
      setMintos: function (puan) {
        if (typeof puan === "number") {
          this.total += puan;
        }
        if (this.total > 1000) {
          this.total = 1000;
        }
        this.puanText.setText(Math.round(this.total).format());
      },
      setHeader: function (header) {
        if (!this.header) {
          this.header = this.add.text(55, 123, header, minti_phaser.baslik_1);
          this.header.anchor.set(0, 1);
          this.header.lineSpacing = -10;
        }
        this.header.text = header;
        this.header.fontSize = 40;
        while (this.header.height > 110) {
          this.header.fontSize--;
        }
      },
      arrangeDefaultButtons1: function (header, pointable) {
        if (typeof header === "undefined") {
          if (this.hasOwnProperty("headers") && Array.isArray(this.headers)) {
            header = this.headers[0];
          } else {
            header = "";
          }
        }
        if (typeof pointable === "undefined") {
          pointable = true;
        }
        if (typeof this.setHeader === "undefined") {
          this.setHeader = Minti.Scene.setHeader.bind(this);
        }
        this.setHeader(header);

        if (pointable) {
          // this.control = this.add.button(1295.6, 73.75, 'kontrol');
          // this.control.anchor.set(.5);
          this.kaydet = this.add.button(
            1503.68,
            73.75,
            "kaydet",
            this.sendUserData,
            this
          );
          this.kaydet.anchor.set(0.5);
          let puanYer = this.add.image(1693.4, 73.75, "puan");
          puanYer.anchor.set(0.5);
          this.puanText = this.add.text(1717.5, puanYer.y, 0, {
            font: "bold 25px Roboto",
            align: "center",
            fill: "#ffffff"
          });
          this.puanText.anchor.set(0.5);
          if (App && App.type === "junior") {
            this.kaydet.x -= 40;
            puanYer.x -= 20;
            this.puanText.x -= 25;
            this.puanText.setStyle({
              font: "bold 40px Noteworthy",
              align: "center",
              fill: "#ffffff"
            });
          }
        }
        if (App.content != undefined || App.content != null) {
          let isMintiBuchOrLernen1 = false;
          let arrayOfContent = App.content.baseURL.toString().split("/");
          for (let i = 0; i < arrayOfContent.length; i++) {
            if (
              arrayOfContent[i] == "mintibuch" ||
              arrayOfContent[i] == "lernen"
            ) {
              isMintiBuchOrLernen1 = true;
              break;
            }
          }
          if (!isMintiBuchOrLernen1) {
            if (typeof this.addFullScreenButtons === "undefined") {
              this.addFullScreenButtons = Minti.Scene.addFullScreenButtons.bind(
                this
              );
            }
            this.addFullScreenButtons(1773, 28.9, 1);
          }
        }

        if (!this.addDefaultSounds) {
          this.addDefaultSounds = Minti.Scene.addDefaultSounds.bind(this);
        }
        this.addDefaultSounds();

        if (!this.getSocketValidation) {
          this.getSocketValidation = Minti.Scene.getSocketValidation.bind(this);
        }
        this.getSocketValidation();
      },
      getSocketValidation: function () {
        var _this = this;
        socket.emit("mintibuchPage");
        socket.on("mintibuchValidation", function (v) {
          _this.validation = v;
        });
        socket.on("reconnect", function () {
          socket.emit("mintibuchPage");
        });
      },
      addDefaultSounds: function () {
        if (this.cache.checkSoundKey("dses")) {
          this.ds = this.add.sound("dses", 0.1);
        }
        if (this.cache.checkSoundKey("glow")) {
          this.gl = this.add.sound("glow", 0.1);
        }
        if (this.cache.checkSoundKey("yses")) {
          this.ys = this.add.sound("yses", 0.1);
        }
      }
    };

    Minti.mintibuchConfig = {
      type: Phaser.AUTO,
      backgroundColor: 0x062830,
      url: App.url,
      loader: {
        crossOrigin: true
      },
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: 1920,
        height: 1080,
        parent: "core",
        fullscreenTarget: "mintibuch_toggle"
      },
      banner: {
        text: "#FFFFFF",
        hidePhaser: App.prod
      }
    };
    Minti.mintibuchConfig1 = {
      type: Phaser.AUTO,
      backgroundColor: 0x062830,
      url: App.url,
      loader: {
        crossOrigin: true
      },
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: 1813,
        height: 884,
        parent: "core",
        fullscreenTarget: "mintibuch_toggle"
      },
      banner: {
        text: "#FFFFFF",
        hidePhaser: App.prod
      }
    };
    Minti.mintibuchConfig2 = {
      type: Phaser.AUTO,
      backgroundColor: 0x062830,
      url: App.url,
      loader: {
        crossOrigin: true
      },
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: 1920,
        height: 1080,
        parent: "core",
        fullscreenTarget: "mintibuch_toggle"
      },
      banner: {
        text: "#FFFFFF",
        hidePhaser: App.prod
      }
    };
    Minti.mintibuchConfig3 = {
      type: Phaser.AUTO,
      backgroundColor: 0x062830,
      url: App.url,
      loader: {
        crossOrigin: true
      },
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: 1825,
        height: 940,
        parent: "core",
        fullscreenTarget: "mintibuch_toggle"
      },
      banner: {
        text: "#FFFFFF",
        hidePhaser: App.prod
      }
    };
    Minti.mintibuchConfigForPhone = {
      type: Phaser.AUTO,
      backgroundColor: 0x062830,
      url: App.url,
      loader: {
        crossOrigin: true
      },
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        parent: "core",
        fullscreenTarget: "mintibuch_toggle"
      },
      banner: {
        text: "#FFFFFF",
        hidePhaser: App.prod
      }
    };
    Minti.PhaserHelper = (function () {
      var Card = new Phaser.Class({
        Extends: Phaser.GameObjects.Container,
        initialize: function (scene, x, y, config) {
          Phaser.GameObjects.Container.call(this, scene, x, y);
          this.turnTime = 100;
          this.config = config;
          this.defaultPosition = new Phaser.Geom.Point(x, y);
          this.create();

          scene.add.existing(this);
        },
        create: function () {
          this.bottom = this.scene.add
            .container(0, 0, [
              this.scene.make.image({ x: 0, y: 0, key: "cardBottom" })
            ])
            .setScale(0, 1);
          if (this.config.picture) {
            this.bottom.add(
              this.scene.make.image({ x: 0, y: 0, key: this.config.picture })
            );
          } else if (this.config.text) {
            this.bottom.add(
              this.scene.make.text({
                x: 0,
                y: 0,
                text: this.config.text,
                style: this.config.style || {
                  fontSize: 30,
                  fontFamily: "Roboto",
                  fill: "#000000"
                },
                origin: 0.5
              })
            );
          }
          this.top = this.scene.make.image({
            x: 0,
            y: 0,
            key: "cardTop"
          });
          if (typeof isAdmin === "function" && isAdmin()) {
            var top = this.top;
            var bounds = top.getBounds();
            this.top = this.scene.add
              .container(0, 0, [
                top,
                this.scene.make.text({
                  x: -bounds.width / 2,
                  y: -bounds.height / 2,
                  text: this.config.id,
                  style: {
                    font: "30px Roboto",
                    fill: "#00ffff"
                  },
                  visible: this.scene.toggleForAdmins || false
                })
              ])
              .setInteractive({
                useHandCursor: true,
                hitArea: bounds,
                hitAreaCallback: Phaser.Geom.Rectangle.Contains
              })
              .on(Phaser.Input.Events.POINTER_DOWN, this.show, this);
          } else {
            this.top
              .setInteractive({ useHandCursor: true })
              .on(Phaser.Input.Events.POINTER_DOWN, this.show, this);
          }
          this.add([this.bottom, this.top]);
        },
        show: function () {
          this.scene.tweens.add({
            targets: [this.top],
            scaleX: 0,
            ease: "Linear",
            duration: this.turnTime
          });
          this.scene.tweens.add({
            targets: [this.bottom],
            scaleX: 1,
            ease: "Linear",
            duration: this.turnTime,
            delay: this.turnTime,
            onComplete: function (tw, targs, image) {
              image.disableInteractive();
              setTimeout(function () {
                image.parentContainer.hide();
              }, 500);
            },
            onCompleteParams: [this.top]
          });
        },
        hide: function () {
          this.scene.tweens.add({
            targets: [this.bottom],
            scaleX: 0,
            ease: "Linear",
            duration: this.turnTime
          });
          this.scene.tweens.add({
            targets: [this.top],
            scaleX: 1,
            ease: "Linear",
            duration: this.turnTime,
            delay: this.turnTime,
            onComplete: function (tw, targs, image) {
              image.setInteractive();
            },
            onCompleteParams: [this.top]
          });
        }
      });
      var PopUp = new Phaser.Class({
        Extends: Phaser.GameObjects.Container,
        initialize: function (scene, x, y, texture, data, callback) {
          Phaser.GameObjects.Container.call(this, scene, x, y);
          if (_typeof(x) === "undefined") {
            this.x = scene.game.config.width / 2;
          }
          if (_typeof(y) === "undefined") {
            this.y = scene.game.config.height / 2;
          }
          if (_typeof(texture) === "undefined") {
            this.texture = "popup";
          }
          if (_typeof(data) === "undefined") {
            this.subText = "Die Übung ist zu Ende.\nBitte klick auf Speichern.";
          }
          if (_typeof(callback) === "undefined") {
            this.callback = Phaser.Utils.NOOP;
          }
          scene.add.existing(this);
          this.scene = scene;
          this.create();
        },
        create: function () {
          var sp = this.scene.add.sprite(0, 0, this.texture);
          var tex = this.scene.add
            .text(0, 0, this.subText, {
              font: "bold 80px Amaranth",
              fill: "#FFFFFF",
              align: "center"
            })
            .setOrigin(0.5);
          this.add([sp, tex]);

          this.setScale(0);
          var tween = this.scene.tweens.add({
            targets: [this],
            duration: 500,
            ease: "Back.easeOut",
            scaleX: 1,
            scaleY: 1,
            onComplete: function () {
              sp.setInteractive({ useHandCursor: true });
              sp.on("pointerdown", this.onInpDown, this);
            },
            callbackScope: this
          });
        },
        onInpDown: function () {
          this.scene.tweens.add({
            targets: [this],
            callbackScope: this,
            duration: 500,
            ease: "Back.easeIn",
            scaleX: 0,
            scaleY: 0,
            onComplete: function () {
              this.destroy();
            }
          });
        }
      });
      var Waiting = new Phaser.Class({
        Extends: Phaser.GameObjects.Container,
        initialize: function (scene, texture, text) {
          if (typeof texture === "undefined") {
            texture = "loader";
          }
          if (typeof text === "undefined") {
            text = "Wird Geladen ";
          }
          Phaser.GameObjects.Container.call(this, scene);
          this.scene = scene;
          this.centerX = scene.game.config.width / 2;
          this.centerY = scene.game.config.height / 2;
          this.subText = text;

          this.create(texture, text);
          scene.add.existing(this);
        },
        create: function (texture, subText) {
          this.tile = this.scene.make
            .tileSprite({
              x: this.centerX,
              y: this.centerY,
              width: 2100,
              height: 2000,
              key: "yaprak",
              angle: Phaser.Math.Between(1, 0) ? 45 : -45,
              alpha: 0.4
            })
            .setTilePosition(-10);
          var keys = Object.keys(
            this.scene.anims.textureManager.get(texture).frames
          );
          var frameNames = this.scene.anims.generateFrameNames(texture, {
            start: 0,
            end: keys.length - 2,
            prefix: "minti_",
            zeroPad: 2
          });
          this.scene.anims.create({
            key: "load",
            frames: frameNames,
            frameRate: 24,
            repeat: -1
          });
          var sp = this.scene.add
            .sprite(this.centerX, this.centerY, texture)
            .setScale(Phaser.Utils.Array.GetRandom([-1, 1]), 1)
            .anims[Phaser.Utils.Array.GetRandom(["play", "play"])]("load");
          //PlayReverse
          var tex = this.scene.make.text({
            y: this.centerY + sp.height / 2,
            text: subText,
            style: {
              fontSize: 60,
              fontFamily: "Amaranth",
              fontStyle: "bold",
              color: "#000000"
            }
          });
          tex.x = this.centerX - tex.width / 2;
          this.tex = tex;
          this.timer = this.scene.time.addEvent({
            delay: 500,
            callback: function () {
              if (tex.text.indexOf("...") === -1) {
                tex.setText(tex.text + ".");
              } else {
                tex.setText(subText);
              }
              if (Phaser.Math.Between(0, 1)) {
                sp.setScale(Phaser.Utils.Array.GetRandom([-1, 1]), 1);
              }
            },
            callbackScope: this,
            loop: true
          });
          this.add([this.tile, sp, tex]);
        }
      });

      var BootScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function () {
          Phaser.Scene.call(this, { key: "BootScene" });
        },
        init: function () {
          this.game.centerX = this.game.config.width / 2;
          this.game.centerY = this.game.config.height / 2;
        },
        preload: function () {
          this.loaders = [
            "loaders/loader1",
            "loaders/loader2",
            "loaders/loader3"
          ];
          this.load.setBaseURL("/web/ortak/img/");
          var rnd = "loader3";
          //var rnd = Phaser.Utils.Array.GetRandom(this.loaders);
          //this.load.atlas("loader", rnd + ".png?v=" + VERSION, rnd + ".json");
          this.load.atlas("loader", rnd + ".png?v=" + VERSION, rnd + ".json");
          this.load.image("yaprak", "yaprak.png?v=" + VERSION);
          this.load.image("popup", "popup.png?v=" + VERSION);
          this.load.on(
            "complete",
            function () {
              this.scene.start("PreloadScene");
            },
            this
          );
        }
      });
      var PreloadScene = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function () {
          Phaser.Scene.call(this);
        },
        init: function (data) {
          this.scene.remove("BootScene");
          this.nextScene = data.nextScene || undefined;
          this.data = data.assets;
          this.cameras.main.backgroundColor = 0xffffff;
          if (typeof this.data.defaultItems === "undefined") {
            this.data.defaultItems = true;
          }
          if (typeof this.data.mp3Player === "undefined") {
            this.data.mp3Player = false;
          }
          if (typeof this.data.klickenUndLernenButtons === "undefined") {
            this.data.klickenUndLernenButtons = false;
          }
          this.wait = new Waiting(this);
          if (typeof data.color === "undefined") {
            this.wait.tex.setColor("#FFFFFF");
          }
          this.wait.timer.remove();
        },
        preload: function () {
          this.load.setBaseURL(this.data.baseURL);
          this.load.audio(
            "dses",
            App.url + "/web/ortak/sound/dogru.mp3?v=" + VERSION
          );
          this.load.audio(
            "yses",
            App.url + "/web/ortak/sound/yanlis.mp3?v=" + VERSION
          );
          this.load.audio(
            "glow",
            App.url + "/web/ortak/sound/glow.mp3?v=" + VERSION
          );
          /* if (this.data.defaultItems) {
                                  let dasDeutscheABC = false;
                                  const arrayOfContent = this.data.baseURL.toString().split("/");
                                  for (const element in arrayOfContent) {
                                      if (element.toString() == "das-deutsche-abc") {
                                          dasDeutscheABC = true;
                                          //this.load.image('bg', `${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/background.jpg`);
                                          this.load.image('bg', 'bg.jpg?v=' + VERSION);
                                          break;
                                      }
                                  }
                                  if (!dasDeutscheABC) {
                                      this.load.image('bg', 'bg.jpg?v=' + VERSION);
                                  }

                                  this.load.image('kaydet', 'kaydet.png?v=' + VERSION);
                              } */
          if (this.data.defaultItems) {
            let isSelectedUnit = false;
            let arrayOfContent = App.content.baseURL.toString().split("/");
            for (let i = 0; i <= arrayOfContent.length - 1; i++) {
              if (
                arrayOfContent[i] === "das-deutsche-abc" ||
                arrayOfContent[i] === "guten-tag" ||
                arrayOfContent[i] === "wer-bist-du" ||
                arrayOfContent[i] === "zahlen" ||
                arrayOfContent[i] === "jahreszeiten-monate-tage" ||
                arrayOfContent[i] === "meine-familie" ||
                arrayOfContent[i] === "wie-spat-ist-es" ||
                arrayOfContent[i] === "woher-kommst-du" ||
                arrayOfContent[i] === "farben-und-adjektive" ||
                arrayOfContent[i] === "mein-tag-clone" ||
                arrayOfContent[i] === "schule-clone" ||
                arrayOfContent[i] === "mein-tag" ||
                arrayOfContent[i] === "schule" ||
                arrayOfContent[i] === "hobbys-und-freizeit-clone" ||
                arrayOfContent[i] === "essen-und-trinken-clone" ||
                arrayOfContent[i] === "hobbys-und-freizeit" ||
                arrayOfContent[i] === "kleidung-clone" ||
                arrayOfContent[i] === "korper-und-gesundheit-clone" ||
                arrayOfContent[i] ===
                "mein-haus-meine-wohnung-mein-zimmer-clone" ||
                arrayOfContent[i] === "berufe-clone" ||
                arrayOfContent[i] === "unterwegs-clone" ||
                arrayOfContent[i] === "freunde-und-freizeit-clone" ||
                arrayOfContent[i] === "feste-und-geschenke-clone"
              ) {
                isSelectedUnit = true;
                /* this.load.image('bg', `${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/background.jpg`); */
                this.load.image(
                  "bg",
                  `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/background.jpg`
                );
                break;
              }
            }
            if (!isSelectedUnit) {
              this.load.image("bg", "bg.jpg?v=" + VERSION);
              this.load.image("kaydet", "kaydet.png?v=" + VERSION);
            } else if (isSelectedUnit) {
              this.load.image(
                "mintos",
                `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/mintos.png`
              );
              this.load.image(
                "kaydet",
                `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/speichern.png`
              );
            }
          }
          if (this.data.klickenUndLernenButtons) {
            this.load.image(
              "klickenUndLernen.prevFull",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/first.png`
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/first.png`
              //App.url + '/lernen/klicken-und-lernen/assets/prevFull.png?v=' + VERSION,
            );
            this.load.image(
              "klickenUndLernen.prev",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/prior.png`
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/prior.png`
              //App.url + '/lernen/klicken-und-lernen/assets/prev.png?v=' + VERSION,
              //`${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/prior.png`
            );
            this.load.image(
              "klickenUndLernen.next",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/next.png`
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/next.png`
              //App.url + '/lernen/klicken-und-lernen/assets/next.png?v=' + VERSION,
            );
            this.load.image(
              "klickenUndLernen.nextFull",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/last.png`
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/last.png`
              //App.url + '/lernen/klicken-und-lernen/assets/nextFull.png?v=' + VERSION,
            );
            this.load.image(
              "klickenUndLernen.sound",
              `${App.assets.mintibuchThemes}${App.type}/${App.theme.theme_mintibuch}/audio.png`
              //`${App.url}/web/mintibuch/themes/${App.type}/${App.theme.theme_mintibuch}/audio.png`
              //App.url + '/lernen/klicken-und-lernen/assets/sound.png?v=' + VERSION,
            );
          }
          if (!this.data.image.fullScreen) {
            if (App.content != undefined || App.content != null) {
              let isMintiBuchOrLernen = false;
              let arrayOfContent = App.content.baseURL.toString().split("/");
              for (let i = 0; i < arrayOfContent.length; i++) {
                if (
                  arrayOfContent[i] == "mintibuch" ||
                  arrayOfContent[i] == "lernen"
                ) {
                  isMintiBuchOrLernen = true;
                  break;
                }
              }
              if (!isMintiBuchOrLernen) {
                this.load.image(
                  "fullScreen",
                  //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png'
                  App.url + "/web/ortak/img/fullScreen.png?v=" + VERSION
                );
                this.load.image(
                  "fullScreenExit",
                  //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png'
                  App.url + "/web/ortak/img/fullScreenExit.png?v=" + VERSION
                );
              }
            } else {
              this.load.image(
                "fullScreen",
                //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png'
                App.url + "/web/ortak/img/fullScreen.png?v=" + VERSION
              );
              this.load.image(
                "fullScreenExit",
                //App.url + '/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png'
                App.url + "/web/ortak/img/fullScreenExit.png?v=" + VERSION
              );
            }
          }
          if (!this.data.image.popup) {
            this.load.image(
              "popup",
              App.url + "/web/ortak/img/popup.png?v=" + VERSION
            );
          }
          if (this.data.olympics) {
            this.load.image(
              "olympics",
              App.url + "/web/ortak/img/olympicsLogo.png?v=" + VERSION
            );
          }
          for (let key in this.data) {
            if (!this.data.hasOwnProperty(key)) {
              continue;
            }
            if (
              key !== "baseURL" &&
              key !== "mp3Player" &&
              key !== "defaultItems"
            ) {
              if (key === "atlas" || key === "multiatlas") {
                for (const subK in this.data[key]) {
                  if (!this.data[key].hasOwnProperty(subK)) {
                    continue;
                  }
                  this.load[key](
                    subK,
                    `${this.data[key][subK][0]}?v=${VERSION}`,
                    `${this.data[key][subK][1]}?v=${VERSION}`
                  );
                }
              } else {
                if (typeof key === "object") {
                  for (const subK in this.data[key]) {
                    if (!this.data[key].hasOwnProperty(subK)) {
                      continue;
                    }
                    this.load[key](
                      subK,
                      `${this.data[key][subK]}?v=${VERSION}`
                    );
                  }
                } else {
                  for (const subK in this.data[key]) {
                    if (!this.data[key].hasOwnProperty(subK)) {
                      continue;
                    }
                    this.load[key](
                      subK,
                      `${this.data[key][subK]}?v=${VERSION}`
                    );
                  }
                }
              }
            }
          }
          this.load.on(
            Phaser.Loader.Events.PROGRESS,
            function (value) {
              this.wait.tex.setText(
                "Wird geladen " + parseInt(value * 100) + "%"
              );
              this.wait.tex.x = this.game.centerX - this.wait.tex.width / 2;
            },
            this
          );
          this.load.on(
            Phaser.Loader.Events.COMPLETE,
            function () {
              if (this.nextScene) {
                this.scene.start(this.nextScene);
              }
            },
            this
          );
        }
      });

      function resize(_game) {
        // var canvas = _game.canvas;
        // var par = $('#content');
        // var width = par.innerWidth();
        // var desiredRatio = 1920 / 1080;
        // var maxHeight = window.innerHeight - par.offset().top - 100;
        // var maxWidth = maxHeight * desiredRatio;
        // if(maxWidth > width) {
        // 	maxWidth = width - 50;
        // 	maxHeight = maxWidth / desiredRatio;
        // }
        // if(canvas) {
        // 	$(canvas).attr('width', 1920);
        // 	$(canvas).attr('height', 1080);
        // 	$(canvas).css({ width: maxWidth, height: maxHeight });
        // 	var bTop = $('.breadcrumb');
        // 	if(bTop.length) {
        // 		window.scrollTo({
        // 			top: bTop.offset().top + bTop.outerHeight() + 10 - $('.brand-link').outerHeight(),
        // 			behavior: 'smooth'
        // 		});
        // 	}
        // }


        const intervalCanvas = setInterval(() => {

          var canvas = _game.canvas;

          if (canvas !== null) {

            var par = $(".content");
            var windowWidth = par.width();
            var windowHeight = par.height();
            var windowRatio = windowWidth / windowHeight;

            var gameRatio = _game.config.width / _game.config.height;
            canvas.style.width = windowWidth + "px";
            canvas.style.height = windowWidth / gameRatio + "px";
            canvas.style.backgroundColor = "transparent";
            clearInterval(intervalCanvas);
          }
        }, 1);

      }

      window.v3Resize = resize; // if needed
      // addResizeListener('#content', resize);

      function openButton(button) {
        if (typeof button === "string") {
          return;
        }
        if (
          button &&
          typeof button === "object" &&
          button.constructor === Array
        ) {
          for (var i = 0; i < button.length; i++) {
            var _but = button[i];
            this.openButton(_but);
          }
        } else {
          button.setInteractive().setAlpha(1);
        }
      }

      function closeButton(button) {
        if (typeof button === "string") {
          return;
        }
        if (
          button &&
          typeof button === "object" &&
          button.constructor === Array
        ) {
          for (var i = 0; i < button.length; i++) {
            var _but = button[i];
            this.closeButton(_but);
          }
        } else {
          button.disableInteractive().setAlpha(0.4);
        }
      }
      function getText(state, x, y, anchor, text, style, parent) {
        var tx = state.make.text(x, y, text, style);
        if (typeof anchor === "object") {
          for (var key in anchor) {
            if (anchor.hasOwnProperty(key)) {
              tx.anchor[key] = parseFloat(anchor[key]);
            }
          }
        } else {
          tx.setOrigin(anchor);
        }
        if (style && style.lineSpacing) {
          tx.lineSpacing = style.lineSpacing;
        }
        if (parent && state[parent]) {
          state[parent].add(tx);
        }
        return tx;
      }

      return {
        resize: resize,
        Card: Card,
        PopUp: PopUp,
        Waiting: Waiting,
        BootScene: BootScene,
        PreloadScene: PreloadScene,
        openButton: openButton,
        closeButton: closeButton,
        getText: getText
      };
    })();
    Minti.OnInput = {
      Over: function () {
        if (this.parentContainer) {
          this.parentContainer.bringToTop(this);
        }
        this.scene.tweens.add({
          targets: this,
          scale: this.scaleTo || 1.1,
          ease: "Back.easeOut",
          duration: 250
        });
      },
      Out: function () {
        this.scene.tweens.add({
          targets: this,
          scale: this.scaleBack || 1,
          ease: "Back.easeOut",
          duration: 250
        });
      },
      Call: function (gameObject) {
        if (!gameObject) {
          return;
        }
        if (!gameObject.scaleTo) {
          gameObject.scaleTo = gameObject.scaleX + 0.1;
        }
        if (!gameObject.scaleBack) {
          gameObject.scaleBack = gameObject.scaleX;
        }
        gameObject
          .on(Phaser.Input.Events.POINTER_OVER, Minti.OnInput.Over)
          .on(Phaser.Input.Events.POINTER_OUT, Minti.OnInput.Out);

        return gameObject;
      }
    };
    Minti.Buttonify = Minti.buttonify = function (
      gameObject,
      draggable,
      options
    ) {
      var callback;
      if (typeof draggable === "object") {
        options = draggable;
        draggable = options.draggable || false;
        callback = options.callback || null;
      }
      if (typeof draggable === "function") {
        callback = draggable;
        options = {};
        draggable = false;
      }
      options = Object.assign(
        {
          useHandCursor: true,
          draggable: draggable,
          bringToTop: true
        },
        options
      );
      gameObject.setInteractive(options);
      gameObject.defaultPosition = { x: gameObject.x, y: gameObject.y };
      if (draggable) {
        gameObject
          .on(Phaser.Input.Events.DRAG, function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
          })
          .on(Phaser.Input.Events.DRAG_START, function () {
            if (this.parentContainer) {
              this.parentContainer.bringToTop(this);
            } else {
              this.scene.children.bringToTop(this);
            }
          });
      }
      if (options.onInput) {
        Minti.OnInput.Call(gameObject);
      }
      if (callback) {
        gameObject.on(Phaser.Input.Events.POINTER_DOWN, callback);
      }
      if (options.disable) {
        gameObject.disableInteractive();
      }
      return gameObject;
    };
    Minti.TweenBigger = function (gameObject) {
      if (gameObject.isAlreadyTweeningFor) {
        return;
      }
      gameObject.isAlreadyTweeningFor = true;
      var scaleTo = gameObject.scaleTo || gameObject.scaleX + 0.1;
      gameObject.scene.tweens.add({
        targets: gameObject,
        scale: scaleTo,
        ease: "Back.easeOut",
        duration: 350
      });
      gameObject.scene.tweens.add({
        targets: gameObject,
        scale: gameObject.scaleBack || scaleTo - 0.1,
        ease: "Back.easeOut",
        duration: 350,
        delay: 350,
        onComplete: function () {
          gameObject.isAlreadyTweeningFor = false;
        }
      });
      return gameObject;
    };
    Minti.ShowMiddle = function () {
      this.add
        .graphics()
        .lineStyle(3, 0xff00ff, 1)
        .moveTo(0, this.centerY)
        .lineTo(this.game.config.width, this.centerY)
        .moveTo(this.centerX, 0)
        .lineTo(this.centerX, this.game.config.height)
        .stroke();
    };
    Minti.StartScene = function (scene, datas) {
      if (!this.cameras) {
        return;
      }
      this.cameras.main.fadeOut(500);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        function () {
          this.scene.start(scene, datas);
        },
        this
      );
    };

    // Extra GameObjects / functionality
    Minti.GameObjects = {};
    Minti.GameObjects.Multiply = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Multiply(scene, x, y, texture, frame) {
        Phaser.GameObjects.Image.call(this, scene, x, y, texture, frame);
        this.setBlendMode(Phaser.BlendModes.MULTIPLY);
      }
    });
    Phaser.GameObjects.GameObjectFactory.register("multiply", function (
      x,
      y,
      texture,
      frame
    ) {
      return this.displayList.add(
        new Minti.GameObjects.Multiply(this.scene, x, y, texture, frame)
      );
    });
    Phaser.GameObjects.GameObjectCreator.register("multiply", function (
      config,
      addToScene
    ) {
      if (config === undefined) {
        config = {};
      }

      var key = Phaser.Utils.Objects.GetAdvancedValue(config, "key", null);
      var frame = Phaser.Utils.Objects.GetAdvancedValue(config, "frame", null);

      var image = new Minti.GameObjects.Multiply(this.scene, 0, 0, key, frame);

      if (addToScene !== undefined) {
        config.add = addToScene;
      }

      Phaser.GameObjects.BuildGameObject(this.scene, image, config);

      return image;
    });

    Minti.GameObjects.Text = new Phaser.Class({
      Extends: Phaser.GameObjects.Text,
      initialize: function Text(scene, x, y, text, style) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, style);
        this.setOrigin(0.5);
      },
      add: function (value) {
        return this.setText(this.text + value.toString());
      },
      remove: function () {
        return this.setText(this.text.slice(0, -1));
      },
      removeAll: function () {
        return this.setText("");
      }
    });
    Phaser.GameObjects.GameObjectFactory.remove("text");
    Phaser.GameObjects.GameObjectCreator.remove("text");
    Phaser.GameObjects.GameObjectFactory.register("text", function (
      x,
      y,
      text,
      style
    ) {
      return this.displayList.add(
        new Minti.GameObjects.Text(this.scene, x, y, text, style)
      );
    });
    Phaser.GameObjects.GameObjectCreator.register("text", function (
      config,
      addToScene
    ) {
      if (config === undefined) {
        config = {};
      }
      var content = Phaser.Utils.Objects.GetAdvancedValue(config, "text", "");
      var style = Phaser.Utils.Objects.GetAdvancedValue(config, "style", null);
      var padding = Phaser.Utils.Objects.GetAdvancedValue(
        config,
        "padding",
        null
      );
      if (padding !== null) {
        style.padding = padding;
      }
      var text = new Minti.GameObjects.Text(this.scene, 0, 0, content, style);
      if (addToScene !== undefined) {
        config.add = addToScene;
      }
      Phaser.GameObjects.BuildGameObject(this.scene, text, config);
      text.autoRound = Phaser.Utils.Objects.GetAdvancedValue(
        config,
        "autoRound",
        true
      );
      text.resolution = Phaser.Utils.Objects.GetAdvancedValue(
        config,
        "resolution",
        1
      );
      return text;
    });

    // override and/or extra functions
    var onProcess = Phaser.Loader.FileTypes.ScriptFile.prototype.onProcess;
    Phaser.Loader.FileTypes.ScriptFile.prototype.onProcess = function () {
      onProcess.call(this);
      this.data.setAttribute("liveLoadScript", true);
    };

    var BaseSoundManagerPlay = Phaser.Sound.BaseSoundManager.prototype.play;
    Phaser.Sound.BaseSoundManager.prototype.play = function (key, extra) {
      if (!this.game.cache.audio.exists(key)) {
        return console.warn("No key found in cache: ", key);
      }
      BaseSoundManagerPlay.call(this, key, extra);
    };

    var SetSize = Phaser.GameObjects.Container.prototype.setSize;
    Phaser.GameObjects.Container.prototype.setSize = function (width, height) {
      if (typeof width === "object") {
        SetSize.call(this, width.displayWidth, width.displayHeight);
        return this;
      }

      SetSize.call(this, width, height);
      return this;
    };
  }
} catch (e) {
  // console.warn(`Phaser is not needed on this page!`);
  function resizev2() {
    // var par = $('.content');
    // var width = par.innerWidth();
    // var desiredRatio = 1920 / 1080;
    // var maxHeight = window.innerHeight - par.offset().top - 190;
    // var maxWidth = maxHeight * desiredRatio;
    // if(maxWidth > 1920) { maxWidth = 1920; }
    // if(maxWidth > width) {
    // 	maxWidth = width - 50;
    // 	maxHeight = maxWidth / desiredRatio;
    // }
    // $('#core').css({ maxWidth: maxWidth, height: maxHeight });
    // $('.content audio').css({ width: maxWidth, margin: '0 auto' });
    var bTop = $(".breadcrumb");
    if (bTop.length) {
      window.scrollTo({
        top:
          bTop.offset().top +
          bTop.outerHeight() +
          10 -
          $(".brand-link").outerHeight(),
        behavior: "smooth"
      });
    }
  }

  if ($("#core1").length) {
    if (App && App.type === "junior") {
      $(".puanYer").css("left", "81.3%");
      $(".puan").css("left", "82.6%");
      $(".gonder").css("left", "69.5%");
      $("#core1 .kontrol").css("left", "58.6%");
    }
  }

  window.onresize = resizev2;
  resizev2();
  $("#pushmenuID").on("click", function () {
    var intt = setInterval(resizev2, 5);
    setTimeout(function () {
      clearInterval(intt);
    }, 500);
  });
}

function anLehrerSendenConfirm() {
  setTimeout(() => {
    let defaultMsg = "Dein Text wurde erfolgreich an deinen Lehrer gesendet!";
    let msg;
    if (schreibenPostResponse !== null) {
      switch (schreibenPostResponse.status) {
        case "success":
          msg = defaultMsg;
          break;
        case "error":
          msg = schreibenPostResponse.message;
          break;
        default:
          msg = defaultMsg;
          break;
      }
    } else {
      msg = defaultMsg;
    }

    Lobibox.confirm({
      title: "Minticity",
      msg: msg,
      buttons: {
        ja: {
          class: "btn btn-success",
          text: "Ok",
          closeOnClick: true
        }
      }
    });
  }, 1500);
}

function schreibenPost(data) {
  $("#sendText").val("");
  let url = App.url + "/" + App.type + "/post/schreiben";
  data.object = schreibenObject;
  axios.post(url, data).then(function (response) {
    schreibenPostResponse = response.data;
    let isDefaultMsg = true;
    if (data.datareturn) {
      isDefaultMsg = false;
      anLehrerSendenConfirm();
    }
    if (data.datamodulid) {
      isDefaultMsg = false;
      setWeiter();
    }
    if (isDefaultMsg) {
      let defaultMsg = "Dein Text wurde erfolgreich an deinen Lehrer gesendet!";
      Lobibox.confirm({
        title: "Minticity",
        msg: defaultMsg,
        buttons: {
          ja: {
            class: "btn btn-success",
            text: "Ok",
            closeOnClick: true
          }
        }
      });
    }
    return 1;
  });
}

function enterFullScreen() {
  var root = document.documentElement;
  return (
    root.requestFullscreen ||
    root.webkitRequestFullscreen ||
    root.mozRequestFullScreen ||
    root.msRequestFullscreen
  );
}

function exitFullScreen() {
  return (
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen
  );
}

function toggleFullScreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    exitFullScreen().call(document);
  } else {
    var $body = $("body"),
      element;
    if ($body.find("#mintibuch_toggle").length) {
      element = $("#mintibuch_toggle")[0];
    }
    enterFullScreen().call(element);
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      $(element).one("");
    }
  }
}

(function () {
  try {
    if (PIXI && PIXI.Sprite) {
      PIXI.Sprite.prototype.xy = function () {
        if (arguments.length >= 2) {
          this.x = arguments[0];
          this.y = arguments[1];
          return true;
        } else {
          this.inputEnabled = false;
          arguments[0].haveSpace = false;
          this.x = arguments[0].worldPosition.x;
          this.y = arguments[0].worldPosition.y;
          return true;
        }
      };
      Phaser.Text.prototype.xy = PIXI.Sprite.prototype.xy;
    }
    Phaser.Group.prototype.getLastChild = Phaser.Group.prototype.getTop;
    Phaser.Group.prototype.getFirstChild = Phaser.Group.prototype.getBottom;
    Phaser.Sprite.prototype.setPosition = function (position) {
      if (!position) {
        return;
      }
      if (position.x) {
        this.x = position.x;
      }
      if (position.y) {
        this.y = position.y;
      }
    };
  } catch (e) { }

  if ($) {
    $.fn.extend({
      animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
          var animations = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "mozAnimationEnd",
            WebkitAnimation: "webkitAnimationEnd"
          };

          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement("div"));
        this.addClass("animated " + animationName).one(
          animationEnd,
          function () {
            $(this).removeClass("animated " + animationName);

            if (typeof callback === "function") {
              callback();
            }
          }
        );
        return this;
      },
      refresh: function () {
        var elems = $(this.selector);
        this.splice(0, this.length);
        this.push.apply(this, elems);
        return this;
      },
      rotate: function (animationName) {
        var animationEnd =
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        $(this)
          .addClass("animated " + animationName)
          .one(animationEnd, function () {
            $(this).removeClass("animated " + animationName);
          });
      }
    });
  }
  var $puan = $(".puan");
  if ($puan) {
    $puan.on("DOMSubtreeModified", function () {
      var val = parseInt($(this).html());
      if (Number.isNaN(val)) {
        return;
      }
      if (val > Minti.MAX_MINTIBUCH_MINTOS) {
        $(this).html(Minti.MAX_MINTIBUCH_MINTOS.format());
      }
    });
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  if (!__mintibuch_toggle) {
    __mintibuch_toggle = document.getElementById("mintibuch_toggle");
  }
  var isFSEnabled =
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled;
  if (!isFSEnabled) {
    $("#toggle_fullscreen, #toggleFS").remove();
    return;
  }

  setTimeout(function () {

    var $toggle = $("#toggle_fullscreen"),
      fullScreen = cdnUrl("/web/ortak/img/fullScreen.png?v=" + VERSION),
      //fullScreen = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png?v=' + VERSION)
      fullScreenExit = cdnUrl("/web/ortak/img/fullScreenExit.png?v=" + VERSION);
    //fullScreenExit = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png?v=' + VERSION)

    if (!$toggle.length) {
      $toggle = $("#toggleFS");
      fullScreen = cdnUrl("/web/ortak/img/fullScreen1.png?v=" + VERSION);
      //fullScreen = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png?v=' + VERSION)
      fullScreenExit = cdnUrl(
        "/web/ortak/img/fullScreenExit1.png?v=" + VERSION
      );
      //fullScreenExit = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png?v=' + VERSION)
      if (App.type === "junior") {
        fullScreen = cdnUrl("/web/ortak/img/fullScreen1J.png?v=" + VERSION);
        //fullScreen = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreen.png?v=' + VERSION)
        fullScreenExit = cdnUrl(
          "/web/ortak/img/fullScreenExit1J.png?v=" + VERSION
        );
        //fullScreenExit = cdnUrl('/web/mintibuch/themes/' + App.type + '/' + App.theme.theme_mintibuch + '/fullScreenExit.png?v=' + VERSION)
      }
    }
    if ($toggle.length) {
      $toggle.find("img").attr("src", fullScreen);
      $toggle.on("click", toggleFullScreen);
      document.onfullscreenchange = function () {
        var bool =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;
        $toggle.find("img").attr("src", !bool ? fullScreen : fullScreenExit);
      };
    }
  }, 0);

  $(document).on("click", "#sendToTeacher", function () {
    var txtArea = $("#sendText");
    var data = {
      text: txtArea.val().trim(),
      datapageid: txtArea.data("pageid"),
      datamodulid: txtArea.data("modulid"),
      datasendedid: txtArea.data("sendedid"),
      datauuid: txtArea.data("uuid"),
      datarecordid: txtArea.data("recordid"),
      datapagetype: txtArea.data("pagetype"),
      datadd: txtArea.data("dd"),
      datareturn: txtArea.data("return")
    };
    if (data.datareturn == true) {
      schreibenObject.text = data.text;

      /*SwalAreYouSure.fire().then(function (response) {
                            if (response.value) {
                                schreibenPost(data);
                            }
                        });*/
      Lobibox.confirm({
        title: "Bestätigen",
        msg: "Bist du dir sicher?",
        buttons: {
          ok: {
            class: "btn btn-success",
            text: "Ja",
            closeOnClick: true
          },
          cancel: {
            class: "btn btn-danger",
            text: "Nein",
            closeOnClick: true
          }
        },
        callback: function (lobibox, type) {
          if (type === "ok") {
            schreibenPost(data);
          }
        }
      });
    } else {
      schreibenPost(data);
    }
  });
});
$(document).on("keyup", "#sendText", function () {
  let txtArea = $("#sendText").val();
  if (txtArea.length < 3) {
    $("#sendToTeacher").attr("disabled", true);
  } else {
    $("#sendToTeacher").attr("disabled", false);
  }
});
window.addEvents = function (callback) {
  $(window).on(
    "resize",
    _.throttle(function () {
      changeEvent(callback);
    }, 200)
  );
  $("#core, #core1").on(
    "widthChanged",
    _.throttle(function () {
      changeEvent(callback);
    }, 200)
  );
  changeEvent(callback);
};
window.changeEvent = function (fn) {
  var $core = $("#core");
  if ($core.length) {
    $(".puan").css({ fontSize: ($core.width() * pointFontSize) / 1920 + "em" });
    $(".input").css({
      fontSize: ($core.width() * mintibuchInputFontSize) / 1920 + "em"
    });
    $(".dcevap").css({
      fontSize: ($core.width() * (mintibuchInputFontSize + 0.5)) / 1920 + "em"
    });
  } else {
    $core = $("#core1");
    $("#core1 .puan").css({
      fontSize: ($core.width() * (mintibuchInputFontSize - 0.3)) / 1920 + "em"
    });
    $("#core1 #m-header").css({
      fontSize: ($core.width() * mintibuchInputFontSize) / 1920 + "em"
    });
    $("#core1 .input").css({
      fontSize: ($core.width() * mintibuchInputFontSize) / 1920 + "em"
    });
    $("#core1 .dcevap").css({
      fontSize: ($core.width() * (mintibuchInputFontSize + 0.5)) / 1920 + "em"
    });
  }
  if (!!(fn && fn.constructor && fn.call && fn.apply)) {
    fn();
  }
};
window.sendEvent = function (total, validation) {
  if (!validation) {
    return;
  }
  $(".kontrol").trigger("click");
  $(".gonder")
    .unbind()
    .remove();
  setTimeout(function () {
    socket.emit("mintibuchPointSave", Math.round(total), validation);
    window.sendEvent = undefined;
  }, 0);
};

window.schreibenObject = {};
window.schreibenPostResponse = null;
window.Minti = Minti;
window.Random = Random;
window.pointFontSize = 4;
window.mintibuchInputFontSize = 2;
window.playSound = Minti.Helper.playSound;
window.correctSoundPath = [
  "/web/ortak/sound/dogru.mp3",
  "/web/ortak/sound/glow.mp3"
];
window.wrongSoundPath = "/web/ortak/sound/yanlis.mp3";
window.anLehrerSendenConfirm = anLehrerSendenConfirm;

let intervalId = setInterval(() => {
  const coreDiv = document.getElementById('core') || document.getElementById('core1');
  if (coreDiv) {
    const inputlar = document.querySelectorAll('input');
    inputlar.forEach(input => {
      input.addEventListener('blur', function () {
        input.value = input.value.trim().replace(/\s+/g, ' ');;
      });
    });
    clearInterval(intervalId);
    const observer = new MutationObserver((mutationsList, observer) => {
      const inputlar = document.querySelectorAll('input');
      inputlar.forEach(input => {
        input.addEventListener('blur', function () {
          input.value = input.value.trim().replace(/\s+/g, ' ');;
        });
      });
    });
    const config = { childList: true };
    observer.observe(coreDiv, config);
  }
}, 1000);


export default Minti.Scene;
