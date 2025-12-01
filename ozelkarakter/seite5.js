document.addEventListener("DOMContentLoaded", function (event) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var core;
  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(
      userAgent
    ) ||
    // iPad Pro gibi "Macintosh" yazan ama dokunmatik olan cihazları da kapsa
    (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);
  const isMobile = /ipad|iPhone|Android/i.test(navigator.userAgent);
  let isPhone = false;
  let tweenAufgaben;
  if (isMobile && !isTablet) {
    isPhone = true;
  }
  let themeURL = App.assets.mintibuchThemes;
  let arrayOfSoundButtons = [];
  let arrayOfinputs = [];
  let trueanswer = [];
  let arrayOfKontrolleButtons = [];
  let arrayOfBoxes = [];
  let _total = 0,
    isPlaying = false,
    genSound;
  var _subData;
  var _this;
  this.Url = App.content.baseURL;
  let inputIndex = 0;

  var Seite5 = {
    Assets: {
      baseURL:
        App.assets.mintibuch.units.dasDeutscheAbc + "seite-5/" + App.type + "/",
      mp3Player: false,
      defaultItems: true,
      image: {
        yer: "box.png",
        box1: "box1.png",
        kontrolle:
          themeURL +
          App.type +
          "/" +
          App.theme.theme_mintibuch +
          "/kontrolle.png",
        logo: themeURL + "minticitylogo.png",

        sound:
          themeURL + App.type + "/" + App.theme.theme_mintibuch + "/audio.png",
      },
      audio: {
        sound0: "1.wav",
        sound1: "2.wav",
        sound2: "3.wav",
        sound3: "4.wav",
        sound4: "5.wav",
        sound5: "6.wav",
        sound6: "7.wav",
      },
    },
    config: _extends(Minti.mintibuchConfigForPhone, {
      parent: "core1",
      transparent: isMobile,
    }),
  };

  Seite5.PlayScene = function () {
    this.total = 0;
    this.answer = 0;
    this.options = [];
    this.isPlaying = false;

    this.init = function () {
      //
      core.scale.setGameSize(1813, 884);
      var pageData = App.content.data;
      this.headers = pageData.headers;
      this.data = pageData.data;

      _this = this;
      this.add.image(0, 0, "bg");
      this.parent = $("#" + this.game.config.parent);
      this.logo = this.add.image(Minti.mintibuchConfig1.width / 2, 50, "logo");
      this.logo.anchor.set(0.5);
      for (var key in Minti.Scene) {
        if (!Minti.Scene.hasOwnProperty(key)) continue;
        this[key] = Minti.Scene[key].bind(this);
      }
    };
    this.create = function () {
      this.arrangeDefaultButtons(this.headers[0], true, true);

      addEvents(this.setFontSize.bind(this));
      this.soundButtons();
      this.createKontrolleButtons();
      this.arrangeBoxes();
      this.arrangeinputs();
    };
    this.arrangeinputs = function () {
      (x = 22), (y = 17);
      for (let i = 0, fark = 0; i < 7; i++, fark += 11.3) {
        this.parent.append(
          '<div id="dc' +
            i +
            '" class="dcevap"></div><input id="in' +
            i +
            '" class="input" type="text" autocomplete="off" autocapitalize="off" maxlength="20" spellcheck="false">'
        );

        $("#in" + i).css({
          top: y + fark + "%",
          left: x + "%",
          width: 50 + "%",
        }); //inputu konumlandırmak için gerekli olan kodlar
        $("#dc" + i).css({
          top: y + fark + 6 + "%",
          left: x + "%",
          width: 50 + "%",
        }); //doğru cevabı konumlandırmak için gereken kodla
      }
      $("#in0").focus();

      changeEvent(this.setFontSize.bind(this));
    };
    this.arrangeBoxes = function () {
      for (let i = 0, fark = 0, x = 360, y = 150; i < 7; i++, fark += 100) {
        this.add.image(x, y + fark, "box1");
      }
    };
    this.createKontrolleButtons = function () {
      for (let i = 0; i < 7; i++) {
        var x = 1500;
        let y = 190 + 100 * i;
        arrayOfKontrolleButtons[i] = this.add.button(x, y, "kontrolle", () => {
          $("#in" + i).prop("disabled", true);
          var current = this.data[i];
          var son = current.data;
          console.log(son);
          this.checkInput($("#in" + i), son, i); //kontrolü sağlayan fonksiyonun çağrılması
          if (isPlaying) {
            genSound.pause();
            this.callback();
          }
          arrayOfSoundButtons[i].destroy();
          arrayOfKontrolleButtons[i].destroy();

          if (i == 6) {
            if (this.total != 0) {
              new Minti.PhaserHelper.PopUp(this);
            }
          }
        });
        arrayOfKontrolleButtons[i].anchor.set(0.5);
      }
    };
    this.soundButtons = function () {
      for (let i = 0; i < 7; i++) {
        var x = 250;
        let a = i - 1;
        let y = 150 + 101 * i;
        arrayOfSoundButtons[i] = this.add.button(x, y, "sound", () => {
          if (!isPlaying) {
            isPlaying = !isPlaying;
            for (let j = 0; j < arrayOfSoundButtons.length; j++) {
              if (i != j) {
                arrayOfSoundButtons[j].alpha = 0.4;
              }
            }

            genSound = this.add.sound(`sound${i}`);
            genSound.play();

            genSound.onStop.add(this.callback, this);
          }
        });
      }
    };
    this.callback = function () {
      for (let i = 0; i < arrayOfSoundButtons.length; i++) {
        arrayOfSoundButtons[i].alpha = 1;
      }
      isPlaying = !isPlaying;
    };
    this.setFontSize = function () {
      //Font boyutunu ayarlayan fonksiyonumuz
      $("#core1 .input").css({
        fontSize:
          (this.parent.width() *
            (mintibuchInputFontSize +
              2)) /*Fontun boyutunun büyüklüğünü ayarlayan sayımız*/ /
            1813 +
          "em",
      });
      $("#core1 .dcevap").css({
        fontSize:
          (this.parent.width() *
            (mintibuchInputFontSize +
              1.3)) /*Fontun boyutunun büyüklüğünü ayarlayan sayımız*/ /
            1813 +
          "em",
      });
    };
    this.checkInput = function (input, data, i) {
      if ($.inArray(input.val(), data) !== -1) {
        input.css({ color: "#009900" }); //Doğruysa girilen inputun rengini yeşil yapan css kodu
        this.setMintos(1000 / 7); //Doğruysa verilcek soru başına mintos puanı;
      } else {
        input.css({ color: "#EE0000" }); //yanlışsa girilen inputu kırmızı renk yapan css kodu
        $("#" + input.attr("id").replace("in" + i + "", "dc" + i + "")).html(
          data[0]
        ); //doğru cevabı inputun altına yazdıran kod
      }
    };
  };
  /* Seite5.PhonePlayScene = function () {
    this.isPortrait = function () {
      return window.innerHeight > window.innerWidth;
    };
    this.init = function () {
      if (this.isPortrait()) {
        console.log("phone portrait");
      } else {
        // Yatay modda tablet: masaüstü görünümü
        console.log("phone landscape");
      }
    };
    this.create = function () {};
  }; */
  Seite5.PhonePlayScene = function () {
    this.isPortrait = function () {
      return window.innerHeight > window.innerWidth;
    };

    this.init = function () {
      const sidebar = document.querySelector(".sidebar-new");
      const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
      core.scale.setGameSize(
        window.innerWidth - sidebarWidth,
        window.innerHeight
      );

      const pageData = App.content.data;
      this.headers = pageData.headers;
      this.data = pageData.data;
    };

    this.create = function () {
      this.renderLayout();
      window.addEventListener("resize", () => this.recreateScene());
    };

    this.recreateScene = function () {
      const sidebar = document.querySelector(".sidebar-new");
      const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
      const w = window.innerWidth - sidebarWidth;
      const h = window.innerHeight;

      core.scale.setGameSize(w, h);
      core.renderer.resize(w, h);
      core.scale.refresh();

      if (this.mainGroup) this.mainGroup.destroy(true);
      document
        .querySelectorAll("#core1 .input, #core1 .dcevap")
        .forEach((e) => e.remove());

      this.renderLayout();
    };

    this.renderLayout = function () {
      const sidebar = document.querySelector(".sidebar-new");
      const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;

      const w = window.innerWidth - sidebarWidth;
      const h = window.innerHeight;
      const isPortrait = this.isPortrait();

      this.mainGroup = this.add.group();

      // 🟥 HEADER
      const groupHeader = this.add.group();
      const headerH = h * 0.12;

      const col1 = w * 0.05;
      const col2 = w * 0.35;
      const col3 = w * 0.65;
      const col4 = w * 0.85;

      const headerText = this.add.text(col1, headerH * 0.55, this.headers[0], {
        font: "bold 24px Arial",
        fill: "#000000",
        wordWrap: true,
        wordWrapWidth: w * 0.3,
      });
      headerText.anchor.set(0, 0.5);

      const logo = this.add.image(col2, headerH * 0.5, "logo");
      logo.anchor.set(0.5);
      logo.scale.setTo(0.4);

      const speichernBtn = this.add.graphics();
      speichernBtn.beginFill(0x9b9b9b, 1);
      speichernBtn.drawRoundedRect(col3 - 60, headerH * 0.5 - 20, 120, 40, 10);
      speichernBtn.endFill();

      const speichernText = this.add.text(col3, headerH * 0.5, "SPEICHERN", {
        font: "bold 16px Arial",
        fill: "#ffffff",
      });
      speichernText.anchor.set(0.5);
      speichernBtn.inputEnabled = true;

      const mintosBg = this.add.graphics();
      mintosBg.beginFill(0x7dd21f, 1);
      mintosBg.drawRoundedRect(col4 - 30, headerH * 0.5 - 20, 60, 40, 10);
      mintosBg.endFill();

      const mintosText = this.add.text(col4, headerH * 0.5, "0", {
        font: "bold 20px Arial",
        fill: "#ffffff",
      });
      mintosText.anchor.set(0.5);

      groupHeader.addMultiple([
        headerText,
        logo,
        speichernBtn,
        speichernText,
        mintosBg,
        mintosText,
      ]);
      this.mainGroup.add(groupHeader);

      // 🟦 İçerik
      if (isPortrait) this.createSingleColumnLayout(w, h);
      else this.createTwoColumnLayout(w, h);
    };

    // 📱 Dikey görünüm
    this.createSingleColumnLayout = function (w, h) {
      const coreDiv = document.querySelector("#core1");
      const total = this.data.length;
      const startY = h * 0.18;
      const gap = h * 0.11;

      const canvasRect = core.canvas.getBoundingClientRect();
      const coreRect = coreDiv.getBoundingClientRect();
      const offsetTop = canvasRect.top - coreRect.top + window.scrollY;
      const offsetLeft = canvasRect.left - coreRect.left + window.scrollX;

      this.groupContent = this.add.group();

      for (let i = 0; i < total; i++) {
        const rowGroup = this.add.group();

        // 🔊 Ses butonu
        const soundBtn = this.add.button(
          w * 0.12,
          startY + i * gap,
          "sound",
          () => {
            console.log("Ses " + i);
          }
        );
        soundBtn.anchor.set(0.5);
        soundBtn.scale.set(0.6);

        // 🎯 Input arka planı
        const inputBg = this.add.graphics();
        inputBg.beginFill(0xffffff, 0.2);
        inputBg.lineStyle(3, 0x77b7d0, 1);
        inputBg.drawRoundedRect(
          w * 0.22,
          startY + i * gap - 22,
          w * 0.52,
          44,
          18
        );
        inputBg.endFill();

        // ✅ Kontrolle butonu
        const kontrolleBtn = this.add.button(
          w * 0.83,
          startY + i * gap,
          "kontrolle",
          () => console.log("Kontrolle " + i)
        );
        kontrolleBtn.anchor.set(0.5);
        kontrolleBtn.scale.set(0.6);

        // ✏️ HTML input ve doğru cevap
        const input = document.createElement("input");
        input.id = `in${i}`;
        input.className = "input";
        input.type = "text";
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        input.setAttribute("spellcheck", "false");

        const dcevap = document.createElement("div");
        dcevap.id = `dc${i}`;
        dcevap.className = "dcevap";

        // 🔧 Pozisyon (kayma düzeltmeli)
        input.style.top = `${offsetTop + startY + i * gap - 22}px`;
        input.style.left = `${offsetLeft + w * 0.22}px`;
        input.style.width = `${w * 0.52}px`;
        input.style.height = `44px`;

        dcevap.style.top = `${offsetTop + startY + i * gap + 25}px`;
        dcevap.style.left = `${offsetLeft + w * 0.22}px`;
        dcevap.style.width = `${w * 0.52}px`;
        dcevap.style.height = `25px`;

        coreDiv.appendChild(input);
        coreDiv.appendChild(dcevap);

        rowGroup.addMultiple([soundBtn, inputBg, kontrolleBtn]);
        this.groupContent.add(rowGroup);
      }

      this.mainGroup.add(this.groupContent);
    };

    // 💻 Yatay görünüm
    this.createTwoColumnLayout = function (w, h) {
      const coreDiv = document.querySelector("#core1");
      const total = this.data.length;
      const half = Math.ceil(total / 2);
      const startY = h * 0.22;
      const gap = h * 0.1;

      const canvasRect = core.canvas.getBoundingClientRect();
      const coreRect = coreDiv.getBoundingClientRect();
      const offsetTop = canvasRect.top - coreRect.top + window.scrollY;
      const offsetLeft = canvasRect.left - coreRect.left + window.scrollX;

      const groupLeft = this.add.group();
      const groupRight = this.add.group();

      const makeRow = (xBase, idx, i) => {
        const soundBtn = this.add.button(
          xBase,
          startY + idx * gap,
          "sound",
          () => {
            console.log("Ses " + i);
          }
        );
        soundBtn.anchor.set(0.5);
        soundBtn.scale.set(0.6);

        const inputBg = this.add.graphics();
        inputBg.beginFill(0xffffff, 0.2);
        inputBg.lineStyle(3, 0x77b7d0, 1);
        inputBg.drawRoundedRect(
          xBase + w * 0.09,
          startY + idx * gap - 20,
          w * 0.25,
          40,
          15
        );
        inputBg.endFill();

        const kontrolleBtn = this.add.button(
          xBase + w * 0.35,
          startY + idx * gap,
          "kontrolle",
          () => console.log("Kontrolle " + i)
        );
        kontrolleBtn.anchor.set(0.5);
        kontrolleBtn.scale.set(0.6);

        const input = document.createElement("input");
        input.id = `in${i}`;
        input.className = "input";
        input.type = "text";
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        input.setAttribute("spellcheck", "false");

        const dcevap = document.createElement("div");
        dcevap.id = `dc${i}`;
        dcevap.className = "dcevap";

        input.style.top = `${offsetTop + startY + idx * gap - 20}px`;
        input.style.left = `${offsetLeft + xBase + w * 0.09}px`;
        input.style.width = `${w * 0.25}px`;
        input.style.height = `40px`;

        dcevap.style.top = `${offsetTop + startY + idx * gap + 25}px`;
        dcevap.style.left = `${offsetLeft + xBase + w * 0.09}px`;
        dcevap.style.width = `${w * 0.25}px`;
        dcevap.style.height = `25px`;

        coreDiv.appendChild(input);
        coreDiv.appendChild(dcevap);

        const g = this.add.group();
        g.addMultiple([soundBtn, inputBg, kontrolleBtn]);
        return g;
      };

      for (let i = 0; i < half; i++) groupLeft.add(makeRow(w * 0.05, i, i));
      for (let i = half; i < total; i++)
        groupRight.add(makeRow(w * 0.55, i - half, i));

      this.mainGroup.addMultiple([groupLeft, groupRight]);
    };
  };

  Seite5.TabletPlayScene = function () {
    this.isPortrait = function () {
      return window.innerHeight > window.innerWidth;
    };
    this.init = function () {
      if (this.isPortrait()) {
        console.log("tablet portrait");
        core.state.start("PhonePlayScene");
      } else {
        // Yatay modda tablet: masaüstü görünümü
        console.log("tablet landscape");
        core.state.start("PlayScene");
      }
    };
    this.create = function () {};
  };

  core = new Phaser.Game(Seite5.config);
  core.state.add("Boot", new Minti.PhaserHelper.BootState("Preload"), true);
  core.state.add(
    "Preload",
    isPhone
      ? new Minti.PhaserHelper.PreloadState(
          "PhonePlayScene",
          Seite5.Assets,
          core
        )
      : isTablet
      ? new Minti.PhaserHelper.PreloadState(
          "TabletPlayScene",
          Seite5.Assets,
          core
        )
      : new Minti.PhaserHelper.PreloadState("PlayScene", Seite5.Assets, core)
  );
  core.state.add("PlayScene", Seite5.PlayScene);
  core.state.add("PhonePlayScene", Seite5.PhonePlayScene);
  core.state.add("TabletPlayScene", Seite5.TabletPlayScene);
});
